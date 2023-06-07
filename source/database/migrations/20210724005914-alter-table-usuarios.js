'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => { 
    await queryInterface.addColumn('usuarios', 'naturalidade', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'escolaridade', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'pai', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'pai_idade', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'mae', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'mae_idade', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'responsavel_financeiro', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'responsavel_financeiro_cpf', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'profissao', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('usuarios', 'religiao', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  return queryInterface.addColumn('usuarios', 'outros_contatos', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'naturalidade')
    await queryInterface.removeColumn('usuarios', 'escolaridade')
    await queryInterface.removeColumn('usuarios', 'pai')
    await queryInterface.removeColumn('usuarios', 'pai_idade')
    await queryInterface.removeColumn('usuarios', 'mae')
    await queryInterface.removeColumn('usuarios', 'mae_idade')
    await queryInterface.removeColumn('usuarios', 'responsavel_financeiro')
    await queryInterface.removeColumn('usuarios', 'responsavel_financeiro_cpf')
    await queryInterface.removeColumn('usuarios', 'profissao')
    await queryInterface.removeColumn('usuarios', 'religiao')
    return queryInterface.removeColumn('usuarios', 'outros_contatos')
  },
};
