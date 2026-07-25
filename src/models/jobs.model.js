const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    salary: { type: String },
    requirements: { type: [String] }
  },
  {
    timestamps: true
  }
);

const Jobs = mongoose.model('Jobs', jobsSchema);
module.exports = Jobs;
