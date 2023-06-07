'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cupons_usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cupons_usuarios.init({
    id_ambiente: DataTypes.STRING,
    id_cupom: DataTypes.INTEGER,
    id_agendamento: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cupons_usuarios',
  });
  return cupons_usuarios;
};