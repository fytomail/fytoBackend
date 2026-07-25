const express = require('express');
const profileController = require('../controllers/profile.controller.js');

const router = express.Router();

router.get('/', profileController.list);
router.get('/:id', profileController.get);
router.post('/', profileController.create);
router.patch('/:id', profileController.update);
router.delete('/:id', profileController.delete);

module.exports = router;
