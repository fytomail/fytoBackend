const mongoose = require('mongoose');
const app = require('./app');
const appConfig = require('./config/app.config');
const dbConfig = require('./config/db.config');
const logger = require('./middlewares/logger');

let server;

logger.info('Connecting to database...');
mongoose.connect(dbConfig.uri, dbConfig.options)
  .then(() => {
    logger.info('Connected to MongoDB successfully');
    server = app.listen(appConfig.port, () => {
      logger.info(`Server is running in ${appConfig.env} mode on port ${appConfig.port}`);
    });
  })
  .catch((err) => {
    logger.error(`Failed to connect to database: ${err.message}`);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed gracefully');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(`Unexpected Error: ${error.stack || error.message || error}`);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  if (server) {
    server.close();
  }
});
