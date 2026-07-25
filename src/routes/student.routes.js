const express = require('express');
const studentController = require('../controllers/student.controller');
const studentValidation = require('../validators/student.validator');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/me', studentController.getProfile);
router.post('/me', validate(studentValidation.createProfile), studentController.createProfile);
router.patch('/me', validate(studentValidation.updateProfile), studentController.updateProfile);

module.exports = router;
