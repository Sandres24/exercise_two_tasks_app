const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => error.msg)
      .join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email')
    .notEmpty()
    .withMessage('El correo es requerido')
    .isEmail()
    .withMessage('Correo inválido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe de tener un mínimo de 8 caracteres')
    .isAlphanumeric()
    .withMessage('La contraseña debe incluir números'),
  checkResult,
];

const createTaskValidators = [
  body('title').notEmpty().withMessage('El título es requerido'),
  body('userId')
    .notEmpty()
    .withMessage('El id del usuario asignado a la tarea es requerido')
    .isNumeric()
    .withMessage('El id debe ser un número'),
  body('limitDate')
    .notEmpty()
    .withMessage('La fecha límite es requerida')
    .matches(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    .withMessage('El formato de la fecha debe ser YYYY-MM-DD HH:mm:ss'),
  checkResult,
];

module.exports = { createUserValidators, createTaskValidators };
