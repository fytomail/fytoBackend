const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validators/auth.validator');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

module.exports = router;
