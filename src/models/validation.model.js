const mongoose = require('mongoose');

const validationSchema = new mongoose.Schema(
  {
    // Schema placeholder for Validation
  },
  {
    timestamps: true
  }
);

const Validation = mongoose.model('Validation', validationSchema);
module.exports = Validation;
