const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema(
  {
    // Schema placeholder for Roadmap
  },
  {
    timestamps: true
  }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
module.exports = Roadmap;
