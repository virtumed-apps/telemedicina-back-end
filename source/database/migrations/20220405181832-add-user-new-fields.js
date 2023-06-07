'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'razao_social', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('usuarios', 'nome_clinica', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('usuarios', 'contself_chave_pessoa', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('usuarios', 'razao_social');
    await queryInterface.removeColumn('usuarios', 'nome_clinica');
    await queryInterface.removeColumn('usuarios', 'contself_chave_pessoa');
  }
};
