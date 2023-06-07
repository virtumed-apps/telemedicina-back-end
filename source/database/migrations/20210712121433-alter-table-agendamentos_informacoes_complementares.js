'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('agendamentos_informacoes_complementares', 'arquivos', {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  }),

  down: async (queryInterface) => queryInterface.removeColumn('agendamentos_informacoes_complementares', 'arquivos'),
};
