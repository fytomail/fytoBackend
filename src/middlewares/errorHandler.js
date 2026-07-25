const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const logger = require('./logger');
const appConfig = require('../config/app.config');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const { statusCode, message } = error;

  if (appConfig.env === 'development') {
    logger.error(`[Error] Code: ${statusCode} - Message: ${message} - Stack: ${error.stack}`);
  } else if (statusCode >= 500) {
    logger.error(`[Internal Error] Message: ${message}`);
  }

  const response = {
    status: 'error',
    error: {
      statusCode,
      message,
      ...(error.errors && { errors: error.errors }),
      ...(appConfig.env === 'development' && { stack: error.stack })
    }
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
