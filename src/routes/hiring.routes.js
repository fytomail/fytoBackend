const express = require('express');
const hiringController = require('../controllers/hiring.controller');

const router = express.Router();

router.get('/', hiringController.list);
router.get('/:id', hiringController.get);
router.post('/', hiringController.create);
router.patch('/:id', hiringController.update);
router.delete('/:id', hiringController.delete);

module.exports = router;
