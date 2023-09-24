const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('reviewapp', 'reviewapp_user', 'Hi0ZDMC841xscmFYxtDgvB8c2Hxa1bKo', {
    host: 'dpg-ck5f1eei9prc73anc8s0-a',
    port: 5432,
    dialect: 'postgres',
});

sequelize.sync();

module.exports = {
  sequelize,
}
