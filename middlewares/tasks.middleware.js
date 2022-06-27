// Model
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const taskExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ where: { id } });

  // Validate if the task exists or is active
  if (!task || task.status !== 'active') {
    return next(new AppError('Task not found', 404));
  }

  req.task = task;

  next();
});

module.exports = { taskExists };
