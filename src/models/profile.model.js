const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    // Schema placeholder for Profile
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
