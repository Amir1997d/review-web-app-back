const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('reviewapp', {
    host: 'dpg-ck5f1eei9prc73anc8s0-a',
    database: 'reviewapp',
    port: 5432,
    dialect: 'postgres',
    user: 'reviewapp_user',
    password: 'Hi0ZDMC841xscmFYxtDgvB8c2Hxa1bKo',
});

sequelize.sync();

module.exports = {
  sequelize,
}
