const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://usuario:senha@localhost:5432/nome_do_banco', {
  dialect: 'postgres',
});

module.exports = sequelize;