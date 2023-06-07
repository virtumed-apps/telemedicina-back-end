const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ambientes_anamnese extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  ambientes_anamnese.init({
    id_ambiente: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    questao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ambientes_anamnese',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return ambientes_anamnese;
};
