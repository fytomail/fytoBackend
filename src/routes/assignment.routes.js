const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');

router.get('/', assignmentController.getAssignments);
router.get('/:id', assignmentController.getAssignmentById);
router.post('/submit', assignmentController.submitAssignment);
router.post('/:id/submit', assignmentController.submitAssignment);
router.get('/submission/:id', assignmentController.getSubmissionById);
router.get('/:id/evaluation', assignmentController.getEvaluation);
router.post('/evaluate', assignmentController.evaluateAssignment);
router.get('/feedback', assignmentController.getFeedback);
router.get('/score', assignmentController.getScore);
router.get('/history', assignmentController.getHistory);

module.exports = router;
