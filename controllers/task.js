const Task = require("../models/task");
const User = require("../models/user");

// Get User’s Tasks
const getUserstasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    if (!tasks) {
      return res.status(404).json({ message: "There are no tasks" });
    }
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Add Task
const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title field is required",
      });
    }

    const task = new Task({ title, description, dueDate, user: req.user.id });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task || task.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, updatedTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getUserstasks,
  addTask,
  updateTask,
  deleteTask,
};
