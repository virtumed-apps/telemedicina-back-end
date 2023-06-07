const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class convenios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  convenios.init({
    id_ambiente: DataTypes.STRING,
    nome: DataTypes.STRING,
    url_logotipo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'convenios',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return convenios;
};
