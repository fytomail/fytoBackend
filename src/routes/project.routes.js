const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');

router.get('/', controller.getProjects);
router.get('/:id', controller.getProjectById);
router.post('/create', controller.createProject);
router.post('/upload', controller.uploadProject);
router.post('/submit', controller.submitProject);
router.post('/evaluate', controller.evaluateProject);
router.get('/report', controller.getReport);
router.get('/history', controller.getHistory);

module.exports = router;
