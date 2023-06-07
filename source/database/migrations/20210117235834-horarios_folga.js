module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('horarios_folgas', {
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
      id_usuario: {
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
    await queryInterface.dropTable('horarios_folgas');
  },
};
