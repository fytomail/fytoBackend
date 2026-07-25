const express = require('express');
const paymentController = require('../controllers/payment.controller.js');

const router = express.Router();

router.get('/', paymentController.list);
router.get('/:id', paymentController.get);
router.post('/', paymentController.create);
router.patch('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);

module.exports = router;
