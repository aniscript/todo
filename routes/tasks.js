import express from "express";
import {
  addTask,
  getAllTasks,
  editTask,
  deleteTask,
  editTaskStatus,
  sortTask,
} from "../controllers/task.js";

const router = express.Router();
//  Add task
router.post("/", addTask);
//  Get all tasks
router.get("/", getAllTasks);
// Edit a task
router.put("/:id", editTask);
// Delete a task
router.delete("/:id", deleteTask);
// Edit task status
router.put("/:id/status", editTaskStatus);
//  Sort tasks by date
router.get("/sort", sortTask);

export default router;
