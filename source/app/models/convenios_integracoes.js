const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class convenios_integracoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  convenios_integracoes.init({
    id_ambiente: DataTypes.STRING,
    id_integracao: DataTypes.INTEGER,
    id_convenio: DataTypes.INTEGER,
    valor: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'convenios_integracoes',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return convenios_integracoes;
};
