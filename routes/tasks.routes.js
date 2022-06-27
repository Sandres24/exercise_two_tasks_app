const express = require('express');

// Controllers
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

// Middlewares
const { createTaskValidators } = require('../middlewares/validators.middleware');
const { taskExists } = require('../middlewares/tasks.middleware');

const tasksRouter = express.Router();

tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status', getTask);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
