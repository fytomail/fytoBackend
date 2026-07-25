const express = require('express');
const practiceController = require('../controllers/practice.controller.js');

const router = express.Router();

router.get('/', practiceController.list);
router.get('/:id', practiceController.get);
router.post('/', practiceController.create);
router.patch('/:id', practiceController.update);
router.delete('/:id', practiceController.delete);

module.exports = router;
