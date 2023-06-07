module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_hora: {
        type: Sequelize.DATE,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      id_consulta: {
        type: Sequelize.INTEGER,
      },
      id_convenio: {
        type: Sequelize.INTEGER,
      },
      id_especialidade: {
        type: Sequelize.INTEGER,
      },
      id_paciente: {
        type: Sequelize.INTEGER,
      },
      id_profissional: {
        type: Sequelize.INTEGER,
      },
      id_usuario_atualizacao: {
        type: Sequelize.INTEGER,
      },
      ocorrencia: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      queixa: {
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
    await queryInterface.dropTable('agendamentos');
  },
};
