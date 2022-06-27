const express = require('express');

// Middlewares
const { createUserValidators } = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');

// Controllers
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.get('/', getAllUsers);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
