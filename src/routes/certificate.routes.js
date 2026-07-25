const express = require('express');
const certificateController = require('../controllers/certificate.controller.js');

const router = express.Router();

router.get('/', certificateController.list);
router.get('/:id', certificateController.get);
router.post('/', certificateController.create);
router.patch('/:id', certificateController.update);
router.delete('/:id', certificateController.delete);

module.exports = router;
