const winston = require('winston');
const loggerConfig = require('../config/logger.config');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
);

const transports = [];

if (loggerConfig.console) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.printf(
          (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
        )
      )
    })
  );
}

if (loggerConfig.file) {
  transports.push(
    new winston.transports.File({
      filename: loggerConfig.file.error,
      level: 'error',
      format
    }),
    new winston.transports.File({
      filename: loggerConfig.file.combined,
      format
    })
  );
}

const logger = winston.createLogger({
  level: loggerConfig.level,
  levels,
  transports,
  silent: loggerConfig.silent
});

module.exports = logger;
