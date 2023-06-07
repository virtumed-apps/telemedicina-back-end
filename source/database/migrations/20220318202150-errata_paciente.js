'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('errata_paciente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_profissional: {
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      id_informacoes_complementares: {
        type: Sequelize.INTEGER,
      },
      errata: {
        type: Sequelize.STRING,
      },
      profissional:  {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('errata_paciente');
  },
};
