const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class agendamentos_reservas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agendamentos_reservas.init({
    data_hora: DataTypes.DATE,
    id_ambiente: DataTypes.STRING,
    id_paciente: DataTypes.INTEGER,
    id_profissional: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'agendamentos_reservas',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return agendamentos_reservas;
};
