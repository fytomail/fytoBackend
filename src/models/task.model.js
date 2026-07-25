const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    // Schema placeholder for Task
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
