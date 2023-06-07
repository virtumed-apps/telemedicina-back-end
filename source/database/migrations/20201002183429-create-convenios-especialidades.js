module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('convenios_especialidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      id_convenio: {
        type: Sequelize.INTEGER,
      },
      disponibilidade: {
        type: Sequelize.STRING,
      },
      id_especialidade: {
        type: Sequelize.INTEGER,
      },
      requer_guia_autorizacao: {
        type: Sequelize.BOOLEAN,
      },
      requer_solicitacao_medica: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('convenios_especialidades');
  },
};
