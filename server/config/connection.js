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

module.exports = sequelize;