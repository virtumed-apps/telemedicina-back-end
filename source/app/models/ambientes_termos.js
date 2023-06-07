const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ambientes_termos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  ambientes_termos.init({
    id_ambiente: DataTypes.STRING,
    termos_de_uso: DataTypes.STRING,
    termos_de_privacidade: DataTypes.STRING,
    id_usuario: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ambientes_termos',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return ambientes_termos;
};
