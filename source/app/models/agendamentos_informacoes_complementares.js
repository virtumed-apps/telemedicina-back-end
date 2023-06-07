const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class agendamentos_informacoes_complementares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agendamentos_informacoes_complementares.init({
    id_agendamento: DataTypes.INTEGER,
    id_usuario: DataTypes.STRING,
    id_profissional: DataTypes.INTEGER,
    id_ambiente: DataTypes.STRING,
    informacao: DataTypes.STRING,
    tipo: DataTypes.STRING,
    arquivos: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'agendamentos_informacoes_complementares',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return agendamentos_informacoes_complementares;
};
