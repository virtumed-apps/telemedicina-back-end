module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios_recuperacoes_senhas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chave: {
        type: Sequelize.STRING,
      },
      data_hora_expiracao: {
        type: Sequelize.DATE,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
      },
      valor: {
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
    await queryInterface.dropTable('usuarios_recuperacoes_senhas');
  },
};
