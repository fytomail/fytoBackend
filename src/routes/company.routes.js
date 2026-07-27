const express = require('express');
const companyController = require('../controllers/company.controller');

const router = express.Router();

router.post('/login', companyController.login);
router.get('/profile', companyController.getProfile);
router.get('/jobs', companyController.getJobs);
router.post('/jobs', companyController.createJob);
router.put('/jobs/:id', companyController.updateJob);
router.delete('/jobs/:id', companyController.deleteJob);
router.get('/candidates', companyController.getCandidates);
router.get('/candidate/:id', companyController.getCandidateById);
router.post('/candidate/shortlist', companyController.shortlistCandidate);
router.post('/interview/schedule', companyController.scheduleInterview);
router.post('/hiring/decision', companyController.hiringDecision);
router.get('/analytics', companyController.getAnalytics);

module.exports = router;
