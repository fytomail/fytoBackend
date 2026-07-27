const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    university: {
      type: String,
      trim: true,
      default: 'Prime Wave University'
    },
    location: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    },
    creditScore: {
      type: Number,
      default: 0
    },
    currentSemester: {
      type: Number,
      default: 1,
      min: 1,
      max: 8
    },
    unlockedSemesters: {
      type: [Number],
      default: [1]
    },
    leaderboardRank: {
      type: Number,
      default: 0
    },
    skills: [{ type: String }],
    interests: [{ type: String }],
    github: { type: String, trim: true },
    resume: { type: String, trim: true },
    verifiedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
    progress: {
      completedTopics: [String],
      completedModules: [String],
      completedSemesters: [Number],
      recentAssignments: [mongoose.Schema.Types.Mixed],
      recentProjects: [mongoose.Schema.Types.Mixed]
    },
    settings: {
      notificationsEnabled: {
        type: Boolean,
        default: true
      },
      profileIsPublic: {
        type: Boolean,
        default: true
      }
    },
    activity: [
      {
        action: String,
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
