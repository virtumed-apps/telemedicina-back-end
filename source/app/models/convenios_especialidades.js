const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class convenios_especialidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  convenios_especialidades.init({
    id_ambiente: DataTypes.STRING,
    id_convenio: DataTypes.INTEGER,
    disponibilidade: DataTypes.STRING,
    id_especialidade: DataTypes.INTEGER,
    requer_guia_autorizacao: DataTypes.BOOLEAN,
    requer_solicitacao_medica: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'convenios_especialidades',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return convenios_especialidades;
};
