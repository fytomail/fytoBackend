const express = require('express');
const domainController = require('../controllers/domain.controller.js');

const router = express.Router();

router.get('/', domainController.list);
router.get('/:id', domainController.get);
router.post('/', domainController.create);
router.patch('/:id', domainController.update);
router.delete('/:id', domainController.delete);

module.exports = router;
