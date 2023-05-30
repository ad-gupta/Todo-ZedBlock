import { createError } from "../error.js";
import Task from "../models/taskInfo.js";

export const addTask = async (req, resp, next) => {
  try {
    const { title, description, active, completed } = req.body;
    if (title.length > 50)
      return resp
        .status(500)
        .json({ error: "max allowable length is of 50 chars" });
    else if (description.length > 256)
      return resp
        .status(500)
        .json({ error: "max allowable length is of 256 chars" });
    else {
      const newTask = await Task.create({
        title,
        description,
        active,
        completed,
      });
      resp.status(201).json(newTask);
    }
  } catch (err) {
    next(err);
  }
};

export const editTask = async (req, resp, next) => {
  try {
    if (req.body.title && req.body.title.length > 50)
      return resp
        .status(500)
        .json({ error: "max allowable length is of 50 chars" });
    else if (req.body.description && req.body.description.length > 256)
      return resp
        .status(500)
        .json({ error: "max allowable length is of 120 chars" });
    else {
      const data = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      resp.status(200).json({ data });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, resp, next) => {
  try {
    let deleted = await Task.deleteOne({ _id: req.params.id });
    resp.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const deleteAll = async (req, resp, next) => {
  try {
    await Task.deleteMany({})
      .then((data) => {
        resp.status(200).json({
          message: "All Tasks are deleted successfully!",
        });
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, resp, next) => {
  try {
    let task = await Task.find();
    resp.status(200).json({
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, resp, next) => {
  try {
    let task = await Task.findById(req.params.id);
    resp.status(200).json({
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const searchTask = async (req, resp, next) => {
  try {
    const { searchTerm } = req.query;

    let result = await Task.find({
      $or: [
        { title: { $regex: searchTerm } },
        { description: { $regex: searchTerm } },
        { category: { $regex: searchTerm } },
      ],
    });
    return resp.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const activeTask = async (req, resp, next) => {
  try {
    let tasks = await Task.find({ active: true });
    resp.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const completedTask = async (req, resp, next) => {
  try {
    let tasks = await Task.find({ completed: true });
    resp.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const sortTitle = async (req, resp, next) => {
  try {
    let tasks = await Task.find().sort({ title: 1 });
    resp.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
