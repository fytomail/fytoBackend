const express = require('express');
const validationController = require('../controllers/validation.controller.js');

const router = express.Router();

router.get('/', validationController.list);
router.get('/:id', validationController.get);
router.post('/', validationController.create);
router.patch('/:id', validationController.update);
router.delete('/:id', validationController.delete);

module.exports = router;
