const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema(
  {
    // Schema placeholder for Practice
  },
  {
    timestamps: true
  }
);

const Practice = mongoose.model('Practice', practiceSchema);
module.exports = Practice;
