const mongoose = require("mongoose");

// const status = ["high", "medium", "low"];

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    // priority: {
    //   type: String,
    //   enum: {
    //     values: ["high", "medium", "low"],
    //     message: "{VALUE} is not supported",
    //   },
    //   required: true,
    // },
    completed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },

  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
