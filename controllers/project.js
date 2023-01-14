import { createError } from "../error.js";
import { ObjectId } from "mongodb";
import BaseRepo from "../baseRepo.js";

// Add Project
export const addProject = async (req, res, next) => {
  try {
    const project = req.body;
    const savedProject = await BaseRepo.create("projects", project);
    res.status(200).json(savedProject);
  } catch (err) {
    next(err);
  }
};

// Get all projects
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await BaseRepo.getAll("projects");
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// Get a project
export const getProject = async (req, res, next) => {
  try {
    const project = await BaseRepo.getAggregateData("projects", req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// Edit a project
export const updateProject = async (req, res, next) => {
  try {
    const project = await BaseRepo.update("projects", req.body, req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// Delete a project
export const deleteProject = async (req, res, next) => {
  try {
    const project = await BaseRepo.delete("projects", req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// Assign task to a project
export const assignTaskToProject = async (req, res, next) => {
  try {
    const updatedProject = await BaseRepo.update(
      "tasks",
      { project_id: req.params.id },
      req.body.taskId
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

// Filter tasks by project name
export const getTasksByProjectId = async (req, res, next) => {
  try {
    const tasks = await BaseRepo.getAll("tasks");
    const filteredTasks = tasks.filter(
      (task) => task.project_id === req.params.id
    );
    res.status(200).json(filteredTasks);
  } catch (err) {
    next(err);
  }
};

// Sort project by date
export const sortProjects = async (req, res, next) => {
  const query = req.query.type;
  let sortParams = "";
  if (query == "start_date") {
    sortParams = { start_date: 1 };
  }
  if (query == "due_date") {
    sortParams = { due_date: 1 };
  }
  try {
    const task = await BaseRepo.sort("projects", sortParams);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};
