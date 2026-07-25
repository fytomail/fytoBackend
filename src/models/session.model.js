const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    isValid: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
