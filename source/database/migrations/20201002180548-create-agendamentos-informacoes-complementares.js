module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agendamentos_informacoes_complementares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_agendamento: {
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      informacao: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('agendamentos_informacoes_complementares');
  },
};
