const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Student = require('../models/student.model');
const Admin = require('../models/admin.model');
const Company = require('../models/company.model');
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
    const { name, username, email, password, role, defaultPortal, phone } = req.body;

    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanUsername = username ? username.trim().toLowerCase() : (cleanEmail ? cleanEmail.split('@')[0] : '');

    const existingUser = await User.findOne({
      $or: [
        { email: cleanEmail },
        ...(cleanUsername ? [{ username: cleanUsername }] : [])
      ]
    });

    if (existingUser) {
      throw new ApiError(400, 'Email or username is already registered');
    }

    const user = await User.create({
      name: name || cleanUsername || cleanEmail.split('@')[0],
      username: cleanUsername,
      email: cleanEmail,
      password,
      role: role || 'student',
      defaultPortal: defaultPortal || (role === 'admin' ? 'Admin Portal' : role === 'company_hr' ? 'Company Portal' : 'Student Portal')
    });

    let userProfile = null;
    if (user.role === 'student') {
      userProfile = await Student.create({
        user: user._id,
        name: user.name || cleanUsername || cleanEmail.split('@')[0],
        phone: phone || ''
      });
    } else if (user.role === 'admin') {
      userProfile = await Admin.create({
        user: user._id,
        name: user.name || cleanUsername || cleanEmail.split('@')[0],
        email: cleanEmail
      });
    } else if (user.role === 'company_hr') {
      userProfile = await Company.create({
        user: user._id,
        companyName: user.name || cleanUsername || cleanEmail.split('@')[0],
        email: cleanEmail,
        contactPerson: user.name
      });
    }

    const tokens = await generateTokens(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        profile: userProfile,
        tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;

    if (!identifier || !password) {
      throw new ApiError(400, 'Email or username and password are required');
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    const user = await User.findOne({
      $or: [
        { email: cleanIdentifier },
        { username: cleanIdentifier },
        { name: identifier.trim() }
      ]
    });

    if (!user) {
      throw new ApiError(401, 'Invalid credentials: User not found');
    }

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials: Password incorrect');
    }

    const tokens = await generateTokens(user);

    let userProfile = null;
    if (user.role === 'student') {
      userProfile = await Student.findOne({ user: user._id });
      if (!userProfile) {
        userProfile = await Student.create({
          user: user._id,
          name: user.name || cleanIdentifier.split('@')[0],
          university: 'Prime Wave University'
        });
      }
    } else if (user.role === 'admin') {
      userProfile = await Admin.findOne({ user: user._id });
      if (!userProfile) {
        userProfile = await Admin.create({
          user: user._id,
          name: user.name || cleanIdentifier.split('@')[0],
          email: user.email
        });
      }
    } else if (user.role === 'company_hr') {
      userProfile = await Company.findOne({ user: user._id });
      if (!userProfile) {
        userProfile = await Company.create({
          user: user._id,
          companyName: user.name || cleanIdentifier.split('@')[0],
          email: user.email
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        profile: userProfile,
        tokens
      }
    });
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
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new ApiError(400, 'Refresh token required');
    }
    const decoded = jwt.verify(refreshToken, jwtConfig.secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, 'User not found');
    }
    const tokens = await generateTokens(user);
    res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
      data: { tokens }
    });
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired refresh token'));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Password reset link sent if account exists" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      throw new ApiError(401, 'Authentication required');
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    let userProfile = null;
    if (user.role === 'student') {
      userProfile = await Student.findOne({ user: user._id });
    } else if (user.role === 'admin') {
      userProfile = await Admin.findOne({ user: user._id });
    } else if (user.role === 'company_hr') {
      userProfile = await Company.findOne({ user: user._id });
    }
    const tokens = await generateTokens(user);
    res.status(200).json({
      success: true,
      message: "Logged-in user profile",
      data: {
        user: user.toJSON(),
        profile: userProfile,
        tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!req.user || !req.user.id) {
      throw new ApiError(401, 'Authentication required');
    }
    const user = await User.findById(req.user.id);
    if (!user || !(await user.isPasswordMatch(oldPassword))) {
      throw new ApiError(400, 'Current password is incorrect');
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      throw new ApiError(401, 'Invalid or missing token');
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new ApiError(401, 'User not found');
    }
    const tokens = await generateTokens(user);
    res.status(200).json({
      success: true,
      message: "JWT is valid",
      data: {
        user: user.toJSON(),
        tokens
      }
    });
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
