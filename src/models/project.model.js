const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    // Schema placeholder for Project
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
