const { Sequelize, DataTypes } = require('sequelize');

const { User } = require('../models/userModel');
const { Review } = require('../models/reviewModel');
const { Tag } = require('../models/tagModel');
const { Comment } = require('../models/commentModel');
const { ReplyComment } = require('../models/replyCommentModel');
const { UserReviewLike } = require('../models/userLikeModel');
const { UserReviewRating } = require('../models/userReviewRate');

const sequelize = new Sequelize('reviewapp', '', '', {
    host: 'localhost',
    dialect: 'postgres',
});

// Define associations between models

// User.hasMany(Review);
// Review.belongsTo(User); //one-to-many

// User.hasMany(Comment);
// Comment.belongsTo(User); //one-to-many

// User.hasMany(UserReviewRating);
// UserReviewRating.belongsTo(User); //one-to-many

// User.hasMany(UserReviewLike);
// UserReviewLike.belongsTo(User); //one-to-many

Review.hasMany(Comment);
Comment.belongsTo(Review); //one-to-many

Review.hasMany(UserReviewRating);
UserReviewRating.belongsTo(Review); //one-to-many

Review.hasMany(UserReviewLike);
UserReviewLike.belongsTo(Review); //one-to-many

Review.belongsToMany(Tag, { through: 'ReviewTag' });
Tag.belongsToMany(Review, { through: 'ReviewTag' }); //many-to-many

Comment.hasMany(ReplyComment);
ReplyComment.belongsTo(Comment); //one-to-many

sequelize.sync();

// Export models for use in your application
// module.exports = {
//   User,
//   Review,
//   Tag,
//   Comment,
//   UserReviewRating,
//   UserReviewLike,
// };

module.exports = {
  sequelize
}