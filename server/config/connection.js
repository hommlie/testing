const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(
  config.test.database,
  config.test.username,
  config.test.password,
  {
    host: config.test.host,
    dialect: config.test.dialect,
    logging: false, // Disable logging SQL queries in test
    dialectOptions: {
      // ssl: {
      //   rejectUnauthorized: false
      // }
      ssl: false // No SSL connection since XAMPP doesn't support it
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;