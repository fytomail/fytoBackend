const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authValidator = require('../validators/auth.validator');

const authenticate = require('../middlewares/authenticate');

router.post('/register', validate(authValidator.register), controller.register);
router.post('/login', validate(authValidator.login), controller.login);
router.post('/logout', controller.logout);
router.post('/refresh-token', controller.refreshToken);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);
router.get('/profile', authenticate, controller.profile);
router.put('/change-password', authenticate, controller.changePassword);
router.get('/verify-token', authenticate, controller.verifyToken);

module.exports = router;
