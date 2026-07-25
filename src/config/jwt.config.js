require('dotenv').config();

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'prime_wave_secret_jwt_key_2026',
  accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
  refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d'
};

module.exports = jwtConfig;
