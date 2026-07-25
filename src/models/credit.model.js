const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema(
  {
    // Schema placeholder for Credit
  },
  {
    timestamps: true
  }
);

const Credit = mongoose.model('Credit', creditSchema);
module.exports = Credit;
