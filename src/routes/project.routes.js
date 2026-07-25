const express = require('express');
const projectController = require('../controllers/project.controller.js');

const router = express.Router();

router.get('/', projectController.list);
router.get('/:id', projectController.get);
router.post('/', projectController.create);
router.patch('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;
