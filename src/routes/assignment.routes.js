const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');

// Notice that user prompt defined endpoints with 'assignment' prefix except the base one.
// e.g., GET /assignments, GET /assignment/:id. 
// Since this is mounted at /assignments, we adjust paths to match the exact requirement:
// Base: /assignments
// /assignments/ -> GET /assignments
// /assignments/assignment/:id -> GET /assignment/:id (if mounted at /)
// Actually we mounted it at /assignments in app.js:
// app.use(`${appConfig.apiPrefix}/assignments`, assignmentRoutes);
// So to match GET /assignments, it's just `/`
// For GET /assignment/:id, it'll be `/:id` if we map it to plural, but to be strictly matching the text:
// Let's do exact match by mapping it to `/` and expecting the mounting to handle it.
// Actually, since app.use('/assignments') is used, GET `/` = GET `/assignments`.
// GET `/:id` = GET `/assignments/:id` (which is standard). The user prompt has a mix of singular and plural.
// Let's write the standard REST endpoints that align with the user's intent.

router.get('/', assignmentController.getAssignments);
router.get('/:id', assignmentController.getAssignmentById);
router.post('/submit', assignmentController.submitAssignment);
router.get('/submission/:id', assignmentController.getSubmissionById);
router.post('/evaluate', assignmentController.evaluateAssignment);
router.get('/feedback', assignmentController.getFeedback);
router.get('/score', assignmentController.getScore);
router.get('/history', assignmentController.getHistory);

module.exports = router;
