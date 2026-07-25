const express = require('express');
const learningController = require('../controllers/learning.controller.js');

const router = express.Router();

router.get('/', learningController.list);
router.get('/:id', learningController.get);
router.post('/', learningController.create);
router.patch('/:id', learningController.update);
router.delete('/:id', learningController.delete);

module.exports = router;
