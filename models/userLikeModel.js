const { sequelize } = require('../controllers/db');

// UserReviewLike model
const UserReviewLike = sequelize.define('userReviewLike', {
    isLiked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set the default value here
    },
});

module.exports = { UserReviewLike };