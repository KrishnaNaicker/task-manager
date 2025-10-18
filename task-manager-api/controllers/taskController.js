const Task = require('../models/task');
const mongoose = require('mongoose');


exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      status
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const tasks = await Task.find()
      .sort({ createdAt: -1 }) 
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Task.countDocuments();

    res.status(200).json({
      success: true,
      count: tasks.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status must be pending, in-progress, or completed' 
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};