const express = require('express');
const router = express.Router();
const controller = require('../controllers/company.controller');

router.get('/', controller.getJobs);
router.post('/', controller.createJob);
router.get('/:id', controller.getJobById);
router.get('/:id/candidates', controller.getJobCandidates);
router.put('/:id', controller.updateJob);
router.delete('/:id', controller.deleteJob);

module.exports = router;
