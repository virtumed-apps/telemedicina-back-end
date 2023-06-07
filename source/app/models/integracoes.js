const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class integracoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  integracoes.init({
    id_ambiente: DataTypes.STRING,
    chave: DataTypes.STRING,
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'integracoes',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return integracoes;
};
