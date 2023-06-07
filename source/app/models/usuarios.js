const bcrypt = require('bcryptjs')

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios.init(
    {
      atende_convenio: DataTypes.BOOLEAN,
      atende_particular: DataTypes.BOOLEAN,
      atende_publico: DataTypes.BOOLEAN,
      ativo: DataTypes.BOOLEAN,
      bairro: DataTypes.STRING,
      celular: DataTypes.STRING,
      cidade: DataTypes.STRING,
      codigo_postal: DataTypes.STRING,
      complemento: DataTypes.STRING,
      cpf: DataTypes.STRING,
      passaporte: DataTypes.STRING,
      status_disabled: DataTypes.BOOLEAN,
      dados_complementares: DataTypes.JSONB,
      data_nascimento: DataTypes.DATE,
      email: DataTypes.STRING,
      endereco: DataTypes.STRING,
      estado_civil: DataTypes.STRING,
      id_ambiente: DataTypes.STRING,
      queixa: DataTypes.STRING,
      nome: DataTypes.STRING,
      numero: DataTypes.STRING,
      perfil_acesso: DataTypes.STRING,
      rg: DataTypes.STRING,
      senha: DataTypes.STRING,
      sexo: DataTypes.STRING,
      sobre: DataTypes.STRING,
      telefone: DataTypes.STRING,
      titulo: DataTypes.STRING,
      uf: DataTypes.STRING,
      url_imagem: DataTypes.STRING,
      naturalidade: DataTypes.STRING,
      escolaridade: DataTypes.STRING,
      pai: DataTypes.STRING,
      pai_idade: DataTypes.STRING,
      mae: DataTypes.STRING,
      mae_idade: DataTypes.STRING,
      responsavel_financeiro: DataTypes.STRING,
      responsavel_financeiro_cpf: DataTypes.STRING,
      profissao: DataTypes.STRING,
      religiao: DataTypes.STRING,
      outros_contatos: DataTypes.STRING,
      irmaos_tem: DataTypes.BOOLEAN,
      irmaos_info: DataTypes.STRING,
      filhos_tem: DataTypes.BOOLEAN,
      filhos_info: DataTypes.STRING,
      conjuge_nome: DataTypes.STRING,
      conjuge_idade: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      descricao_nota: DataTypes.STRING,
      nome_clinica: DataTypes.STRING,
      razao_social: DataTypes.STRING,
      contself_chave_pessoa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'usuarios',
      timestamps: true,
      freezeTableName: true,
      createdAt: 'data_hora_criacao',
      updatedAt: 'data_hora_atualizacao',
    },
  );

  usuarios.beforeSave(async (usuario) => {
    if (usuario.senha) {
      return (usuario.senha = await bcrypt.hash(usuario.senha, 10));
    }
  });

  return usuarios;
};
