const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaderboard.controller');

router.get('/', controller.getLeaderboard);
router.get('/top10', controller.getTop10);
router.get('/rank', controller.getRank);
router.get('/profile/:id', controller.getProfile);

module.exports = router;
