const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);

router.get('/', dashboardController.getDashboard);
router.get('/progress', dashboardController.getProgress);
router.get('/credits', dashboardController.getCredits);
router.get('/recent-projects', dashboardController.getRecentProjects);
router.get('/recent-assignments', dashboardController.getRecentAssignments);

module.exports = router;
