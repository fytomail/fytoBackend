const express = require('express');
const router = express.Router();
const controller = require('../controllers/roadmap.controller');

router.get('/:id', controller.getTopicById);
router.post('/:id/complete', controller.completeTopic);
router.put('/:id/complete', controller.completeTopic);

module.exports = router;
