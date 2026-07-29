const express = require('express');
const router = express.Router();
const controller = require('../controllers/roadmap.controller');

router.get('/', controller.getSemesters);
router.get('/:id', controller.getSemesterById);
router.get('/:id/modules', controller.getSemesterModules);

module.exports = router;
