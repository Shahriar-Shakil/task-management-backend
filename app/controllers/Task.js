const asyncHandler = require("express-async-handler");

const TaskModel = require("../model/task");

// Created Task
//@access private
exports.create = asyncHandler(async (req, res) => {
  const { title, description } = req.body ?? {};
  if (!title) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const task = await TaskModel.create({
    title: title,
    description: description,
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
  const { completed, sortOrder } = req.query ?? {};
  let query = {};
  if (completed && completed !== "all") {
    query.completed = completed;
  }
  // Construct sort object based on query parameters
  const sortQuery = {};
  if (sortOrder) {
    sortQuery.createdAt = sortOrder === "asc" ? 1 : -1;
  }

  const tasks = await TaskModel.find({ user: req.user.id })
    .sort(sortQuery)
    .where({ ...query });
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
  const deleteIds = req.body;
  // Convert taskIds to MongoDB ObjectIds
  if (!deleteIds || !deleteIds.length) {
    res.status(404);
    throw new Error("Need to provide ids");
  }
  // const objectIds = deleteIds.map((id) => new ObjectId(id));

  // console.log(objectIds);
  const result = await TaskModel.deleteMany({ _id: { $in: deleteIds } });
  res.status(200).json({ deletedCount: result.deletedCount });
});
