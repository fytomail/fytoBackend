const path = require('path');

const uploadConfig = {
  dest: process.env.UPLOAD_DEST || path.resolve(__dirname, '../../uploads'),
  maxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760', 10), // 10 MB limit
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
};

module.exports = uploadConfig;
