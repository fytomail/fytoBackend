const mongoose = require('mongoose');

const hiringSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    jobPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost'
    },
    status: {
      type: String,
      enum: ['interviewing', 'offered', 'hired', 'rejected'],
      default: 'interviewing'
    }
  },
  {
    timestamps: true
  }
);

const Hiring = mongoose.model('Hiring', hiringSchema);
module.exports = Hiring;
