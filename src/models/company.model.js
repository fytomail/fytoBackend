const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    companyName: {
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
    industry: {
      type: String,
      trim: true,
      default: 'Technology'
    },
    location: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    contactPerson: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PENDING', 'VERIFIED'],
      default: 'ACTIVE'
    }
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
