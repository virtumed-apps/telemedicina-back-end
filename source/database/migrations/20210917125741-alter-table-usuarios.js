'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'conjuge_nome', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    return queryInterface.addColumn('usuarios', 'conjuge_idade', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'conjuge_nome');
    return queryInterface.removeColumn('usuarios', 'conjuge_idade');
  }
};
