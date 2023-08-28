const { sequelize } = require('../controllers/db');

// Tag model
const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

module.exports = { Tag };