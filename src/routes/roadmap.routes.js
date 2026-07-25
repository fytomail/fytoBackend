const express = require('express');
const roadmapController = require('../controllers/roadmap.controller.js');

const router = express.Router();

router.get('/', roadmapController.list);
router.get('/:id', roadmapController.get);
router.post('/', roadmapController.create);
router.patch('/:id', roadmapController.update);
router.delete('/:id', roadmapController.delete);

module.exports = router;
