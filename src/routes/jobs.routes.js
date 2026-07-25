const express = require('express');
const jobsController = require('../controllers/jobs.controller.js');

const router = express.Router();

router.get('/', jobsController.list);
router.get('/:id', jobsController.get);
router.post('/', jobsController.create);
router.patch('/:id', jobsController.update);
router.delete('/:id', jobsController.delete);

module.exports = router;
