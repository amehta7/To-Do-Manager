const express = require("express");
const {
  getUserstasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getUserstasks);
router.post("/", auth, addTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
