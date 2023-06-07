'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('token_atendimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_agendamento: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      expira: {
        type: Sequelize.STRING
      },
      id_ambiente: {
        type: Sequelize.STRING
      },
      data_hora_criacao: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_hora_atualizacao: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('token_atendimentos');
  }
};