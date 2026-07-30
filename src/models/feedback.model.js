const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    category: {
      type: String,
      required: true
    },
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String, required: true },
    status: { type: String, enum: ['NEW', 'REVIEWED', 'ACTIONED'], default: 'NEW' }
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
