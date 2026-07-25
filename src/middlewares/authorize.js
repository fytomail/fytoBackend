const ApiError = require('../utils/ApiError');

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required.'));
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden: Insufficient privileges.'));
  }

  return next();
};

const hasPermission = (requiredPermission) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required.'));
  }

  const permissions = req.user.permissions || [];
  if (!permissions.includes(requiredPermission)) {
    return next(new ApiError(403, 'Forbidden: Missing required permission.'));
  }

  return next();
};

module.exports = {
  authorize,
  hasPermission
};
