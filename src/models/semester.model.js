const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String },
  order: { type: Number, required: true }
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  topics: [topicSchema],
  assignment: {
    title: { type: String },
    instructions: { type: String },
    maxCredit: { type: Number, default: 100 }
  }
});

const semesterSchema = new mongoose.Schema(
  {
    semesterNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 8
    },
    title: { type: String, required: true },
    description: { type: String },
    modules: [moduleSchema],
    isLockedByDefault: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;
