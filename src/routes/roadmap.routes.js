const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmap.controller');

router.get('/semesters', roadmapController.getSemesters);
router.get('/semester/:id', roadmapController.getSemesterById);
router.get('/semester/:id/modules', roadmapController.getSemesterModules);
router.get('/module/:id/topics', roadmapController.getModuleTopics);
router.get('/topic/:id', roadmapController.getTopicById);
router.put('/topic/:id/complete', roadmapController.completeTopic);
router.post('/topic/:id/complete', roadmapController.completeTopic);
router.put('/semester/unlock', roadmapController.unlockSemester);

module.exports = router;
