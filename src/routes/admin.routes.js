const express = require('express');
const adminController = require('../controllers/admin.controller.js');

const router = express.Router();

router.get('/', adminController.list);
router.get('/:id', adminController.get);
router.post('/', adminController.create);
router.patch('/:id', adminController.update);
router.delete('/:id', adminController.delete);

module.exports = router;
