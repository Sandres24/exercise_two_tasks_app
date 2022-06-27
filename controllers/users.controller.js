// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    include: Task,
  });

  res.status(200).json({
    status: 'success',
    users,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(204).json({
    status: 'success',
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = req.user;

  user.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
