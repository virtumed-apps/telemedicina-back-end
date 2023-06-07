const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pagamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pagamentos.init({
    id_ambiente: DataTypes.STRING,
    valor: DataTypes.STRING,
    id_agendamento: DataTypes.INTEGER,
    params: DataTypes.JSONB,
    response: DataTypes.JSONB,
    ip: DataTypes.STRING,
    tipo: DataTypes.STRING,
    gateway: DataTypes.STRING,
    id_cupom_desconto: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'pagamentos',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return pagamentos;
};
