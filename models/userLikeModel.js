const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const UserReviewLike = sequelize.define('user_like', {}, 
  {
    timestamps: false
  }
);

module.exports = { UserReviewLike };