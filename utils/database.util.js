const { Sequelize, DataTypes } = require('sequelize');

// Environment variables
require('dotenv').config();

// Connect to database
const db = new Sequelize({
  dialect: 'postgres',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  logging: false,
});

module.exports = { db, DataTypes };
