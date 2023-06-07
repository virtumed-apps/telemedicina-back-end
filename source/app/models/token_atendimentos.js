const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class token_atendimentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  token_atendimentos.init({
    id_agendamento: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expira: DataTypes.DATE,
    id_ambiente: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'token_atendimentos',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return token_atendimentos;
};
