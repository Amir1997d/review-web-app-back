const { sequelize } = require('../controllers/db');
const { DataTypes } = require('sequelize');
const { Review } = require('./reviewModel');
const { Comment } = require('./commentModel');
const { UserReviewRating } = require('./userReviewRate');
const { UserReviewLike } = require('./userLikeModel');

const User = sequelize.define('user', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    githubId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    preferredLanguage: {
        type: DataTypes.STRING,
        defaultValue: "en",
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

User.hasMany(Review);
Review.belongsTo(User); //one-to-many

User.hasMany(Comment);
Comment.belongsTo(User); //one-to-many

User.hasMany(UserReviewRating);
UserReviewRating.belongsTo(User); //one-to-many

User.hasMany(UserReviewLike);
UserReviewLike.belongsTo(User); //one-to-many

module.exports = { User };