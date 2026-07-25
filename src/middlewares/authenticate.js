const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const ApiError = require('../utils/ApiError');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      permissions: decoded.permissions || []
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token expired.'));
    }
    return next(new ApiError(401, 'Invalid access token.'));
  }
};

module.exports = authenticate;
