require('dotenv').config();

const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  silent: process.env.NODE_ENV === 'test',
  console: true,
  file: {
    combined: 'logs/combined.log',
    error: 'logs/error.log'
  }
};

module.exports = loggerConfig;
