module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios_especialidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      id_especialidade: {
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      valor_consulta: {
        type: Sequelize.FLOAT,
      },
      duracao: {
        type: Sequelize.STRING,
      },
      duracao_limite: {
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
    await queryInterface.dropTable('usuarios_especialidades');
  },
};
