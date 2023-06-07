'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'irmaos_tem', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
    await queryInterface.addColumn('usuarios', 'irmaos_info', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('usuarios', 'filhos_tem', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
    return queryInterface.addColumn('usuarios', 'filhos_info', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'irmaos_tem')
    await queryInterface.removeColumn('usuarios', 'irmaos_info')
    await queryInterface.removeColumn('usuarios', 'filhos_tem')
    return queryInterface.removeColumn('usuarios', 'filhos_info')
  }
};
