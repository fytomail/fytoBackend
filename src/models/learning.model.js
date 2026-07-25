const mongoose = require('mongoose');

const learningSchema = new mongoose.Schema(
  {
    // Schema placeholder for Learning
  },
  {
    timestamps: true
  }
);

const Learning = mongoose.model('Learning', learningSchema);
module.exports = Learning;
