const express = require('express');
const collegeController = require('../controllers/college.controller.js');

const router = express.Router();

router.get('/', collegeController.list);
router.get('/:id', collegeController.get);
router.post('/', collegeController.create);
router.patch('/:id', collegeController.update);
router.delete('/:id', collegeController.delete);

module.exports = router;
