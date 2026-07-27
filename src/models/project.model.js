const mongoose = require('mongoose');

const capstoneSubmissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    projectTitle: { type: String, required: true },
    repoUrl: { type: String, required: true },
    liveUrl: { type: String },
    aiEvaluation: {
      frontendScore: { type: Number, default: 0 },
      backendScore: { type: Number, default: 0 },
      databaseScore: { type: Number, default: 0 },
      architectureScore: { type: Number, default: 0 },
      uiUxScore: { type: Number, default: 0 },
      securityScore: { type: Number, default: 0 },
      performanceScore: { type: Number, default: 0 },
      documentationScore: { type: Number, default: 0 },
      industryStandardsScore: { type: Number, default: 0 },
      totalScore: { type: Number, default: 0 },
      creditsAwarded: { type: Number, default: 0 },
      feedback: { type: String },
      evaluatedAt: { type: Date, default: Date.now }
    },
    status: {
      type: String,
      enum: ['SUBMITTED', 'EVALUATED', 'VERIFIED'],
      default: 'SUBMITTED'
    }
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', capstoneSubmissionSchema);
module.exports = Project;
