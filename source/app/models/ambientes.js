const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ambientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  ambientes.init({
    id_ambiente: DataTypes.STRING,
    configuracoes: DataTypes.JSONB,
    email_usuario_atualizacao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ambientes',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return ambientes;
};
