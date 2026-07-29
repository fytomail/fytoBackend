const express = require('express');
const router = express.Router();
const controller = require('../controllers/roadmap.controller');

router.get('/:id/topics', controller.getModuleTopics);

module.exports = router;
