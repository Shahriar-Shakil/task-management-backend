const mongoose = require("mongoose");

const priority = ["high", "medium", "low"];

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: priority, required: true },
    completed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },

  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
