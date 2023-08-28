const { sequelize } = require('../controllers/db');

// Comment model
const Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
});

module.exports = { Comment };