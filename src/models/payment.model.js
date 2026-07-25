const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    // Schema placeholder for Payment
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
