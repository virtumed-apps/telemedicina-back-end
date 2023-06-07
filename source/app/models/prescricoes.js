const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class prescricoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  prescricoes.init({
    id_ambiente: DataTypes.STRING,
    id_profissional: DataTypes.INTEGER,
    id_paciente: DataTypes.INTEGER,
    id_prescricao_integracao: DataTypes.INTEGER,
    id_agendamento: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'prescricoes',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return prescricoes;
};
