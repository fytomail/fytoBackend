const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const jwtConfig = require('../config/jwt.config');
const ApiError = require('../utils/ApiError');

const generateToken = (userId, expires, role, secret = jwtConfig.secret) => {
  const payload = {
    id: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(expires.getTime() / 1000),
    role
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = new Date();
  const accessMinMatch = jwtConfig.accessExpiration.match(/^(\d+)m$/);
  const accessMinutes = accessMinMatch ? parseInt(accessMinMatch[1], 10) : 15;
  accessTokenExpires.setMinutes(accessTokenExpires.getMinutes() + accessMinutes);
  const accessToken = generateToken(user._id, accessTokenExpires, user.role);

  const refreshTokenExpires = new Date();
  const refreshDayMatch = jwtConfig.refreshExpiration.match(/^(\d+)d$/);
  const refreshDays = refreshDayMatch ? parseInt(refreshDayMatch[1], 10) : 7;
  refreshTokenExpires.setDate(refreshTokenExpires.getDate() + refreshDays);
  const refreshToken = generateToken(user._id, refreshTokenExpires, user.role);

  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expires: refreshTokenExpires
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires
    }
  };
};

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(400, 'Email is already registered.');
      }

      const user = await User.create({ email, password, role });
      const tokens = await generateAuthTokens(user);
      
      const userResponse = {
        id: user._id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
      };

      res.status(201).json({
        status: 'success',
        data: {
          user: userResponse,
          tokens
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(401, 'Incorrect email or password.');
      }

      const tokens = await generateAuthTokens(user);

      const userResponse = {
        id: user._id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
      };

      res.status(200).json({
        status: 'success',
        data: {
          user: userResponse,
          tokens
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokenDoc = await RefreshToken.findOne({ token: refreshToken, blacklisted: false });
      if (!tokenDoc) {
        throw new ApiError(401, 'Invalid refresh token.');
      }

      await RefreshToken.deleteOne({ token: refreshToken });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async refreshTokens(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokenDoc = await RefreshToken.findOne({ token: refreshToken, blacklisted: false });
      if (!tokenDoc) {
        throw new ApiError(401, 'Refresh token not found or blacklisted.');
      }

      const decoded = jwt.verify(refreshToken, jwtConfig.secret);
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new ApiError(401, 'User associated with token not found.');
      }

      await RefreshToken.deleteOne({ token: refreshToken });

      const tokens = await generateAuthTokens(user);
      res.status(200).json({
        status: 'success',
        data: tokens
      });
    } catch (error) {
      next(new ApiError(401, 'Invalid refresh token.'));
    }
  }
}

module.exports = new AuthController();
