module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      cupom: {
        type: Sequelize.STRING,
      },
      desconto: {
        type: Sequelize.INTEGER,
      },
      expiracao: {
        type: Sequelize.DATE,
      },
      disabled: {
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
    await queryInterface.dropTable('cupons');
  },
};
