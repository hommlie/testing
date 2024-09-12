const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(
  config.production.database,
  config.production.username,
  config.production.password,
  {
    host: config.production.host,
    dialect: config.production.dialect,
    logging: false, // Disable logging SQL queries in production
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
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