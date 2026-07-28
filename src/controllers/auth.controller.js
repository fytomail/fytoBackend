const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Student = require('../models/student.model');
const RefreshToken = require('../models/refreshToken.model');
const ApiError = require('../utils/ApiError');
const jwtConfig = require('../config/jwt.config');

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.accessExpiration }
  );

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.refreshExpiration }
  );

  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expires
  });

  return { accessToken, refreshToken };
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, defaultPortal, phone } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ApiError(400, 'Email is already registered');
    }

    const user = await User.create({
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      password,
      role: role || 'student',
      defaultPortal: defaultPortal || (role === 'admin' ? 'Admin Portal' : role === 'company_hr' ? 'Company Portal' : 'Student Portal')
    });

    if (user.role === 'student') {
      await Student.create({
        user: user._id,
        name: user.name || email.split('@')[0],
        phone: phone || ''
      });
    }

    const tokens = await generateTokens(user);

    const userObj = user.toJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userObj,
        tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.isPasswordMatch(password))) {
        const tokens = await generateTokens(user);
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: {
            user: user.toJSON(),
            tokens
          }
        });
      }
    }
    res.status(200).json({ success: true, message: "Login" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Refresh JWT" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Forgot password" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Reset password" });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logged-in user" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Change password" });
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Verify JWT" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  profile,
  changePassword,
  verifyToken
};
