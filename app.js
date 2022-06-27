const express = require('express');

// Environment variables
require('dotenv').config();

// Routers
const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

// Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.util');

// Init express app
const app = express();

// App settings
app.set('PORT', process.env.PORT || 4000);

// Middlewares
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
  next(new AppError(`${req.method} ${req.originalUrl} not found in this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = { app };
