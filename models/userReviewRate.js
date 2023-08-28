const { sequelize } = require('../controllers/db');

// UserReviewRating model
const UserReviewRating = sequelize.define('userReviewRating', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    }
});

module.exports = { UserReviewRating };