const express = require('express');
const creditController = require('../controllers/credit.controller.js');

const router = express.Router();

router.get('/', creditController.list);
router.get('/:id', creditController.get);
router.post('/', creditController.create);
router.patch('/:id', creditController.update);
router.delete('/:id', creditController.delete);

module.exports = router;
