'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ambientes_termos_teleconsulta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
          type: Sequelize.TEXT,
        },
      termos_teleconsulta: {
        type: Sequelize.TEXT,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ambientes_termos_teleconsulta');
  },
};
