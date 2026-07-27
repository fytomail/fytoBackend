const mongoose = require('mongoose');

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    semesterNumber: { type: Number, required: true },
    moduleId: { type: String, required: true },
    codeContent: { type: String, required: true },
    submissionUrl: { type: String },
    aiEvaluation: {
      correctnessScore: { type: Number, default: 0 },
      logicScore: { type: Number, default: 0 },
      codeQualityScore: { type: Number, default: 0 },
      bestPracticesScore: { type: Number, default: 0 },
      documentationScore: { type: Number, default: 0 },
      totalScore: { type: Number, default: 0 },
      creditsAwarded: { type: Number, default: 0 },
      feedbackText: { type: String },
      evaluatedAt: { type: Date, default: Date.now }
    },
    status: {
      type: String,
      enum: ['SUBMITTED', 'EVALUATED', 'REJECTED'],
      default: 'SUBMITTED'
    }
  },
  { timestamps: true }
);

const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
module.exports = AssignmentSubmission;
