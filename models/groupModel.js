const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const Group = sequelize.define('group', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
},{
  timestamps: false
});

module.exports = { Group };