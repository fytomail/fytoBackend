const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    // Schema placeholder for Company
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
