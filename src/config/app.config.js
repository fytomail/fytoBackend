require('dotenv').config();

const parseOrigins = () => {
  const raw = process.env.CORS_ORIGIN || process.env.CLIENT_URL || '*';
  if (raw.trim() === '*') return '*';
  return raw.split(',').map(item => item.trim()).filter(Boolean);
};

const appConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  env: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  clientUrl: process.env.CLIENT_URL || 'https://meetkishore.in',
  cors: {
    origin: parseOrigins(),
    credentials: process.env.CORS_CREDENTIALS !== 'false'
  },
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '1000', 10),
    message: process.env.RATE_LIMIT_MESSAGE || 'Too many requests, please try again later.'
  }
};

module.exports = appConfig;
