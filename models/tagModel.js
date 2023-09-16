const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');
const { Review } = require('./reviewModel');

const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},{
    timestamps: false
});


module.exports = { Tag };