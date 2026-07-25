const express = require('express');
const analyticsController = require('../controllers/analytics.controller.js');

const router = express.Router();

router.get('/', analyticsController.list);
router.get('/:id', analyticsController.get);
router.post('/', analyticsController.create);
router.patch('/:id', analyticsController.update);
router.delete('/:id', analyticsController.delete);

module.exports = router;
