const asyncHandler = require("express-async-handler");

const TaskModel = require("../model/task");

// Created Task
//@access private
exports.create = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !priority) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const task = await TaskModel.create({
    title: title,
    description: description,
    priority: priority,
    completed: "no",
    user: req.user.id,
  });

  res.status(201).json(task);
  // await task
  //   .save()
  //   .then((data) => {
  //     res.status(201).json({
  //       message: "Task is created",
  //       data,
  //     });
  //   })
  //   .catch((err) => {
  // res.status(500).json({
  //   message: err.message || "Some error occurred while Create task",
  // });
  //   });
});

// Retrieve all Task from db
//@access private

exports.findAll = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.find({ user: req.user.id });
  if (!tasks) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(tasks);
});

// single Task
//@access private
exports.findOne = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.findById(req.params.id);
  if (!tasks) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(tasks);
});

// update task
//@access private

exports.update = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await TaskModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// delete task
//@access private

exports.destroy = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  if (task.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to Delete other user tasks");
  }
  await task.deleteOne({ _id: req.params.id });
  res.status(200).json(task);
});