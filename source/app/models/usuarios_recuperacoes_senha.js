const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios_recuperacoes_senha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios_recuperacoes_senha.init({
    chave: DataTypes.STRING,
    data_hora_expiracao: DataTypes.DATE,
    id_ambiente: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    token: DataTypes.STRING,
    valor: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuarios_recuperacoes_senhas',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return usuarios_recuperacoes_senha;
};
