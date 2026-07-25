const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    establishedYear: { type: Number }
  },
  {
    timestamps: true
  }
);

const College = mongoose.model('College', collegeSchema);
module.exports = College;
