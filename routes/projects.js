import express from "express";
import {
  getAllProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject,
  assignTaskToProject,
  sortProjects,
} from "../controllers/project.js";

const router = express.Router();

// Get all projects
router.get("/", getAllProjects);

// Create a project
router.post("/", addProject);

// Get a project
router.get("/:id", getProject);

// Update a project
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);

// Assign task to a project
router.put("/:id/task", assignTaskToProject);

// Sort task by date
router.get("/sort", sortProjects);

export default router;
