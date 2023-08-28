const { sequelize } = require('../controllers/db');

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
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10,
    },
  }
});

module.exports = { Review };