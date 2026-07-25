const express = require('express');
const companyController = require('../controllers/company.controller.js');

const router = express.Router();

router.get('/', companyController.list);
router.get('/:id', companyController.get);
router.post('/', companyController.create);
router.patch('/:id', companyController.update);
router.delete('/:id', companyController.delete);

module.exports = router;
