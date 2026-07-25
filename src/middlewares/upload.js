const multer = require('multer');
const fs = require('fs');
const uploadConfig = require('../config/upload.config');
const ApiError = require('../utils/ApiError');

if (!fs.existsSync(uploadConfig.dest)) {
  fs.mkdirSync(uploadConfig.dest, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadConfig.dest);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (uploadConfig.allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, `Invalid file type. Allowed formats: ${uploadConfig.allowedTypes.join(', ')}`), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: uploadConfig.maxSize
  },
  fileFilter
});

module.exports = upload;
