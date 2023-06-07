const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios_convenios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios_convenios.init({
    id_ambiente: DataTypes.STRING,
    id_convenio: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'usuarios_convenios',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return usuarios_convenios;
};
