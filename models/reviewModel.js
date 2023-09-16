const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');

const { Comment } = require('./commentModel');
const { Tag } = require('./tagModel');
const { UserReviewRating } = require('./userReviewRate');
const { UserReviewLike } = require('./userLikeModel');


// Review model
const Review = sequelize.define('review', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewedItemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 10,
    },
  },
  avgRate: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0.0,
      max: 5.0,
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ReviewTag = sequelize.define('review_tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
}, { timestamps: false });

Review.hasMany(Comment);
Comment.belongsTo(Review); //one-to-many

Review.hasMany(UserReviewRating);
UserReviewRating.belongsTo(Review); //one-to-many

Review.hasMany(UserReviewLike);
UserReviewLike.belongsTo(Review); //one-to-many

Review.belongsToMany(Tag, { through: 'review_tag'});
Tag.belongsToMany(Review, { through: 'review_tag' });
Review.hasMany(ReviewTag);
ReviewTag.belongsTo(Review);
Tag.hasMany(ReviewTag);
ReviewTag.belongsTo(Tag); //super-many-to-many

module.exports = { Review, ReviewTag };