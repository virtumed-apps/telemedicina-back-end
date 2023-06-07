const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cupons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cupons.init({
    id_ambiente: DataTypes.STRING,
    cupom: DataTypes.STRING,
    desconto: DataTypes.INTEGER,
    expiracao: DataTypes.DATE,
    quantidade_maxima_uso: DataTypes.INTEGER,
    desabilitado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'cupons',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return cupons;
};
