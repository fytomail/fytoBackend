const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/', dashboardController.getDashboard);
router.get('/student/:studentId', dashboardController.getStudentDashboardById);
router.get('/platform', dashboardController.getPlatformDashboard);
router.get('/hr/:companyId', dashboardController.getHrDashboard);
router.get('/hr', dashboardController.getHrDashboard);
router.get('/progress', dashboardController.getProgress);
router.get('/credits', dashboardController.getCredits);
router.get('/recent-projects', dashboardController.getRecentProjects);
router.get('/recent-assignments', dashboardController.getRecentAssignments);

module.exports = router;
