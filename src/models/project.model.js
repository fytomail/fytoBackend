const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
