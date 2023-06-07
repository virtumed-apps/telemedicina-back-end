module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('convenios_termos_aceites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      id_agendamento: {
        type: Sequelize.INTEGER,
      },
      id_convenio: {
        type: Sequelize.INTEGER,
      },
      url_imagem_assinatura: {
        type: Sequelize.STRING,
      },
      url_imagem_paciente: {
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
    await queryInterface.dropTable('convenios_termos_aceites');
  },
};
