const express = require('express');
const taskController = require('../controllers/task.controller.js');

const router = express.Router();

router.get('/', taskController.list);
router.get('/:id', taskController.get);
router.post('/', taskController.create);
router.patch('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
