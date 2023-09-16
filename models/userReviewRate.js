const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const UserReviewRating = sequelize.define('user_review_rating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  }
}, {
  timestamps: false
});

module.exports = { UserReviewRating };