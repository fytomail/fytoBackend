require('dotenv').config();

const dbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/prime-wave',
  options: {
    autoIndex: true
  }
};

module.exports = dbConfig;
