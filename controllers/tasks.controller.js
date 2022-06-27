// Models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  // Validate if the user who is assigned the task exists or is active
  const user = await User.findOne({ where: { id: userId } });

  if (!user || user.status !== 'active') {
    return next(new AppError('The user does not exist', 400));
  }

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
    startDate: new Date(),
  });

  res.status(201).json({
    status: 'success',
    newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const getTask = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  if (!['active', 'completed', 'late', 'cancelled'].includes(status)) {
    return next(new AppError(`${status} is not a valid task status`, 400));
  }

  const tasks = await Task.findAll({ where: { status } });

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const task = req.task;
  const { time } = req.body;

  // Error if the finish date is less than the start date
  if (new Date(time) < new Date(task.startDate)) {
    return next(new AppError('The finish date cannot be less than the start date', 400));
  }

  await task.update({
    finishDate: new Date(time),
    status: new Date(task.limitDate) >= new Date(time) ? 'completed' : 'late',
  });

  res.status(204).json({
    status: 'success',
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const task = req.task;

  await task.update({ status: 'cancelled' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
