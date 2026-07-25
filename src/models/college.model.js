const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    // Schema placeholder for College
  },
  {
    timestamps: true
  }
);

const College = mongoose.model('College', collegeSchema);
module.exports = College;
