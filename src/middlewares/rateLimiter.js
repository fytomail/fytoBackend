const rateLimit = require('express-rate-limit');
const appConfig = require('../config/app.config');

const limiterMiddleware = rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  max: appConfig.rateLimit.max,
  message: {
    status: 'error',
    statusCode: 429,
    message: appConfig.rateLimit.message
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return !appConfig.rateLimit.enabled || appConfig.rateLimit.max <= 0;
  }
});

const rateLimiter = (req, res, next) => {
  if (!appConfig.rateLimit.enabled || appConfig.rateLimit.max <= 0) {
    return next();
  }
  return limiterMiddleware(req, res, next);
};

module.exports = rateLimiter;
