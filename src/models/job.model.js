const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    salaryRange: {
      type: String,
      trim: true
    },
    requirements: [{
      type: String
    }],
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED', 'DRAFT'],
      default: 'OPEN'
    }
  },
  {
    timestamps: true
  }
);

const JobPost = mongoose.model('JobPost', jobPostSchema);
module.exports = JobPost;
