const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    // Schema placeholder for Analytics
  },
  {
    timestamps: true
  }
);

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
