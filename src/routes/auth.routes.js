const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authValidator = require('../validators/auth.validator');

router.post('/register', validate(authValidator.register), controller.register);
router.post('/login', validate(authValidator.login), controller.login);
router.post('/logout', controller.logout);
router.post('/refresh-token', controller.refreshToken);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);
router.get('/profile', controller.profile);
router.put('/change-password', controller.changePassword);
router.get('/verify-token', controller.verifyToken);

module.exports = router;
