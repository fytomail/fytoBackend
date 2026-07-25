const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    title: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter;
