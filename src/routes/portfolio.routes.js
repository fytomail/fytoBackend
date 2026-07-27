const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.controller');

router.get('/', portfolioController.getPortfolio);
router.put('/', portfolioController.updatePortfolio);
router.get('/public', portfolioController.getPublicPortfolio);
router.get('/:studentId', portfolioController.getPortfolioByStudentId);
router.post('/github', portfolioController.connectGithub);
router.post('/resume', portfolioController.uploadResume);

module.exports = router;
