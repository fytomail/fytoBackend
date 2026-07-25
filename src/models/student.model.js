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
    bio: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    },
    domain: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    skills: [
      {
        type: String
      }
    ],
    interests: [
      {
        type: String
      }
    ],
    progress: {
      roadmapId: mongoose.Schema.Types.ObjectId,
      completedTopics: [String],
      completedQuizzes: [String],
      completedProjects: [String]
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
