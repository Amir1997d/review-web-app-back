const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const UserReviewRating = sequelize.define('user_rating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  }
}, {
  timestamps: false
});

module.exports = { UserReviewRating };