const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema(
  {
    // Schema placeholder for Domain
  },
  {
    timestamps: true
  }
);

const Domain = mongoose.model('Domain', domainSchema);
module.exports = Domain;
