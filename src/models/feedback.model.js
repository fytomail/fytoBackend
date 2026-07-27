const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    category: {
      type: String,
      enum: ['AI Learning', 'Assignments', 'Projects', 'Platform Experience', 'Suggestions'],
      required: true
    },
    rating: { type: Number, min: 1, max: 5 },
    feedbackText: { type: String, required: true },
    status: { type: String, enum: ['NEW', 'REVIEWED', 'ACTIONED'], default: 'NEW' }
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
