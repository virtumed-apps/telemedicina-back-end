const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class emails_enviados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  emails_enviados.init({
    id_ambiente: DataTypes.STRING,
    corpo: DataTypes.STRING,
    destinatario: DataTypes.STRING,
    id_agendamento: DataTypes.INTEGER,
    remetente: DataTypes.STRING,
    tipo: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'emails_enviados',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return emails_enviados;
};
