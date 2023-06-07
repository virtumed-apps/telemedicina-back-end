const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class agendamentos_integracoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agendamentos_integracoes.init({
    id_agendamento: DataTypes.INTEGER,
    id_ambiente: DataTypes.STRING,
    id_integracao: DataTypes.INTEGER,
    valor: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'agendamentos_integracoes',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return agendamentos_integracoes;
};
