module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('integracoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      chave: {
        type: Sequelize.STRING,
      },
      nome: {
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
    await queryInterface.dropTable('integracoes');
  },
};
