const express = require('express');
const roleController = require('../controllers/role.controller.js');

const router = express.Router();

router.get('/', roleController.list);
router.get('/:id', roleController.get);
router.post('/', roleController.create);
router.patch('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
