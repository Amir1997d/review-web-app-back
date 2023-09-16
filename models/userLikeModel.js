const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const UserReviewLike = sequelize.define('user_review_like', {
    isLiked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
}, {
  timestamps: false
}
);

module.exports = { UserReviewLike };