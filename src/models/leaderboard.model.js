const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema(
  {
    // Schema placeholder for Leaderboard
  },
  {
    timestamps: true
  }
);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
