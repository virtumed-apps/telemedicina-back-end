module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('ambientes_anamnese', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        id_usuario: {
            type: Sequelize.INTEGER,
          },
        id_ambiente: {
          type: Sequelize.STRING,
        },
        questao: {
          type: Sequelize.TEXT,
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
      await queryInterface.dropTable('ambientes_anamnese');
    },
  };
  