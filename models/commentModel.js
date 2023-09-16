const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('comment', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = { Comment };