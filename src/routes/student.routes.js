const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');

router.get('/', controller.getStudents);
router.post('/', controller.createStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);

module.exports = router;
