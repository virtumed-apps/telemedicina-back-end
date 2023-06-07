const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class horarios_folgas extends Model {
    /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
    static associate(models) {
      // define association here
    }
  }
  horarios_folgas.init({
    data_hora: DataTypes.DATE,
    id_ambiente: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'horarios_folgas',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return horarios_folgas;
};
