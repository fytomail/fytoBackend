const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');

router.get('/', controller.getStudents);
router.post('/', controller.createStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.patch('/:id', controller.updateStudent);
router.get('/:id/stats', controller.getStudentStats);
router.get('/:studentId/certificates', controller.getStudentCertificates);
router.get('/:studentId/portfolio', controller.getStudentPortfolio);
router.get('/:studentId/progress/semester/:semesterId', controller.getStudentSemesterProgress);

module.exports = router;
