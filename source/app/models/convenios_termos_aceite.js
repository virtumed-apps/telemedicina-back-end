const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class convenios_termos_aceite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  convenios_termos_aceite.init({
    id_ambiente: DataTypes.STRING,
    id_agendamento: DataTypes.INTEGER,
    id_convenio: DataTypes.INTEGER,
    url_imagem_assinatura: DataTypes.STRING,
    url_imagem_paciente: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'convenios_termos_aceite',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return convenios_termos_aceite;
};
