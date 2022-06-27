const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Task } = require('./models/task.model');

// Utils
const { db } = require('./utils/database.util');

// Database Auth
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Establish model's relations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User);

// Database Sync
db.sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err));

// Starting server
app.listen(app.get('PORT'), () => {
  console.log(`Server running on port ${app.get('PORT')}`);
});
