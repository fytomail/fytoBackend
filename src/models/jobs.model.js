const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema(
  {
    // Schema placeholder for Jobs
  },
  {
    timestamps: true
  }
);

const Jobs = mongoose.model('Jobs', jobsSchema);
module.exports = Jobs;
