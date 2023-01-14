import { createError } from "../error.js";
import { ObjectId } from "mongodb";

import BaseRepo from "../baseRepo.js";

// Add Task
export const addTask = async (req, res, next) => {
  try {
    const task = req.body;
    task.status = "todo";
    const savedTask = await BaseRepo.create("tasks", task);
    res.status(200).json(savedTask);
  } catch (err) {
    next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    let searchParams = "";
    const query = req.query;
    if (query.name) {
      searchParams = { title: { $regex: query.name, $options: "i" } };
    }
    if (query.status) {
      searchParams = { status: query.status };
    }
    const tasks = await BaseRepo.getAll("tasks", searchParams);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const taskStatus = req.body.status;
    if (taskStatus === "done") {
      req.body.done_date = new Date();
    } else {
      req.body.done_date = null;
    }
    const task = await BaseRepo.update("tasks", req.body, req.params.id);

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await BaseRepo.delete("tasks", req.params.id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const editTaskStatus = async (req, res, next) => {
  try {
    const task = await BaseRepo.getOne("tasks", req.params.id);
    if (task.status === "todo") {
      task.status = "done";
      req.body.done_date = new Date();
    } else {
      task.status = "todo";
      req.body.done_date = null;
    }
    const updatedTask = await BaseRepo.update("tasks", task, req.params.id);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Sort task by dates
export const sortTask = async (req, res, next) => {
  const query = req.query.type;
  let sortParams = "";
  if (query == "start_date") {
    sortParams = { start_date: 1 };
  }
  if (query == "end_date") {
    sortParams = { end_date: 1 };
  }
  if (query == "due_date") {
    sortParams = { due_date: 1 };
  }
  try {
    const task = await BaseRepo.sort("tasks", sortParams);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};
