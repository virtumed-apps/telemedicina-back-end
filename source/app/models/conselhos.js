const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class conselhos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  conselhos.init({
    id_ambiente: DataTypes.STRING,
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'conselhos',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return conselhos;
};
