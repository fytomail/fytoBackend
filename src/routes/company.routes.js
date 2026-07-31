const express = require('express');
const router = express.Router();
const controller = require('../controllers/company.controller');

router.get('/', controller.getCompanies);
router.post('/', controller.createCompany);
router.get('/profile', controller.getProfile);
router.get('/jobs', controller.getJobs);
router.post('/jobs', controller.createJob);
router.get('/candidates', controller.getCandidates);
router.get('/analytics', controller.getAnalytics);
router.get('/:id', controller.getCompanyById);

module.exports = router;
