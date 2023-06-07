module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      atende_convenio: {
        type: Sequelize.BOOLEAN,
      },
      atende_particular: {
        type: Sequelize.BOOLEAN,
      },
      atende_publico: {
        type: Sequelize.BOOLEAN,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
      },
      bairro: {
        type: Sequelize.STRING,
      },
      celular: {
        type: Sequelize.STRING,
      },
      cidade: {
        type: Sequelize.STRING,
      },
      codigo_postal: {
        type: Sequelize.STRING,
      },
      complemento: {
        type: Sequelize.STRING,
      },
      cpf: {
        type: Sequelize.STRING,
      },
      passaporte: {
        type: Sequelize.STRING,
      },
      status_disabled: {
        type: Sequelize.BOOLEAN,
      },
      dados_complementares: {
        type: Sequelize.JSONB,
      },
      data_nascimento: {
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.STRING,
      },
      endereco: {
        type: Sequelize.STRING,
      },
      estado_civil: {
        type: Sequelize.STRING,
      },
      id_ambiente: {
        type: Sequelize.STRING,
      },
      queixa: {
        type: Sequelize.STRING,
      },
      nome: {
        type: Sequelize.STRING,
      },
      numero: {
        type: Sequelize.STRING,
      },
      perfil_acesso: {
        type: Sequelize.STRING,
      },
      rg: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
      sexo: {
        type: Sequelize.STRING,
      },
      sobre: {
        type: Sequelize.STRING,
      },
      telefone: {
        type: Sequelize.STRING,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      uf: {
        type: Sequelize.STRING,
      },
      url_imagem: {
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
    await queryInterface.dropTable('usuarios');
  },
};
