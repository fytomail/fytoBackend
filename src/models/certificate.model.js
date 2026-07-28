const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    issueDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    credentialUrl: {
      type: String,
      trim: true
    },
    skillsVerified: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
