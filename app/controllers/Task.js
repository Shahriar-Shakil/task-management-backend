const asyncHandler = require("express-async-handler");

const TaskModel = require("../model/task");

// Created Task
//@access private
exports.create = asyncHandler(async (req, res) => {
  if (!req.body.title && !req.body.priority && !req.body.userId) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  console.log(req.body.userId);
  const task = new TaskModel({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    completed: "no",
    user: req.body.userId,
  });

  await task
    .save()
    .then((data) => {
      res.send({
        message: "Task is created",
        data,
      });
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error occurred while Create task",
      });
    });
});

// Retrieve all users from db
//@access private

exports.findAll = asyncHandler(async (req, res) => {
  try {
    const task = await TaskModel.find({}).populate("user");
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// single Task
//@access private

exports.findOne = asyncHandler(async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id).exec();
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// update task
//@access private

exports.update = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  await TaskModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

// delete task
exports.destroy = asyncHandler(async (req, res) => {
  await TaskModal.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});
