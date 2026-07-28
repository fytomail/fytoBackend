const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    department: {
      type: String,
      default: 'Management'
    },
    permissions: {
      type: [String],
      default: ['all']
    }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
