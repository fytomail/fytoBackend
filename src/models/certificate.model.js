const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    // Schema placeholder for Certificate
  },
  {
    timestamps: true
  }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
