const express = require('express');
const recruiterController = require('../controllers/recruiter.controller');

const router = express.Router();

router.get('/', recruiterController.list);
router.get('/:id', recruiterController.get);
router.post('/', recruiterController.create);
router.patch('/:id', recruiterController.update);
router.delete('/:id', recruiterController.delete);

module.exports = router;
