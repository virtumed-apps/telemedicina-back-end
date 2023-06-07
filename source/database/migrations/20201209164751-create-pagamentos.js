module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pagamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      valor: {
        type: Sequelize.STRING,
      },
      id_agendamento: {
        type: Sequelize.INTEGER,
      },
      params: {
        type: Sequelize.JSONB,
      },
      response: {
        type: Sequelize.JSONB,
      },
      ip: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      gateway: {
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
    await queryInterface.dropTable("pagamentos");
  },
};
