const express = require('express');
const notificationController = require('../controllers/notification.controller.js');

const router = express.Router();

router.get('/', notificationController.list);
router.get('/:id', notificationController.get);
router.post('/', notificationController.create);
router.patch('/:id', notificationController.update);
router.delete('/:id', notificationController.delete);

module.exports = router;
