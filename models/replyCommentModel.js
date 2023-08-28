const { sequelize } = require('../controllers/db');

// ReplyComment model
const ReplyComment = sequelize.define('replyComment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
});

module.exports = { ReplyComment };