const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    // Schema placeholder for Admin
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
