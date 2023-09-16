const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('reviewapp', '', '', {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.sync();

module.exports = {
  sequelize,
}