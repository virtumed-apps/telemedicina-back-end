module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prescricoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      id_paciente: {
        type: Sequelize.INTEGER,
      },
      id_profissional: {
        type: Sequelize.INTEGER,
      },
      id_agendamento: {
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
    await queryInterface.dropTable('prescricoes');
  },
};
