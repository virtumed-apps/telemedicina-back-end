module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("especialidades", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      nome: {
        type: Sequelize.STRING,
      },
      permite_convenio: {
        type: Sequelize.BOOLEAN,
      },
      permite_particular: {
        type: Sequelize.BOOLEAN,
      },
      permite_publico: {
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
      valor_consulta: {
        type: Sequelize.FLOAT,
      },
      duracao_consulta: {
        type: Sequelize.STRING,
      },
      url_imagem: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      quantidade_maxima_usuarios: {
        type: Sequelize.INTEGER,
      },
      pre_definido: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("especialidades");
  },
};
