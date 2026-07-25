const express = require('express');
const leaderboardController = require('../controllers/leaderboard.controller.js');

const router = express.Router();

router.get('/', leaderboardController.list);
router.get('/:id', leaderboardController.get);
router.post('/', leaderboardController.create);
router.patch('/:id', leaderboardController.update);
router.delete('/:id', leaderboardController.delete);

module.exports = router;
