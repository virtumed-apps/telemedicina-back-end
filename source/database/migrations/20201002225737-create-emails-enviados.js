module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails_enviados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      corpo: {
        type: Sequelize.STRING,
      },
      destinatario: {
        type: Sequelize.STRING,
      },
      id_agendamento: {
        type: Sequelize.INTEGER,
      },
      remetente: {
        type: Sequelize.STRING,
      },
      tipo: {
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
    await queryInterface.dropTable('emails_enviados');
  },
};
