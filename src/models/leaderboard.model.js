const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      unique: true
    },
    rank: {
      type: Number,
      required: true
    },
    creditScore: {
      type: Number,
      required: true,
      default: 0
    },
    totalProjectsCompleted: {
      type: Number,
      default: 0
    },
    totalAssignmentsCompleted: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
