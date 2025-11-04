import { Request, Response } from 'express';
import Task, { ITask } from '../models/taskModel';

// @desc    Get all tasks
// @route   GET /api/tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    // Use the string id from req.user for consistency
    const tasks = await Task.find({ user: req.user?.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Compare strings to avoid ObjectId vs string mismatch
    if (task.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({ message: 'Please provide name and status' });
    }

    const task: ITask = new Task({
      name,
      status,
      user: req.user?.id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PATCH /api/tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Compare strings to avoid ObjectId vs string mismatch
    if (task.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task.name = name || task.name;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Compare strings to avoid ObjectId vs string mismatch
    if (task.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne(); // Use deleteOne() on the document
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};