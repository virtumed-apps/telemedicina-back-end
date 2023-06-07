const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios_conselhos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios_conselhos.init({
    id_ambiente: DataTypes.STRING,
    id_conselho: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    numero: DataTypes.STRING,
    uf_conselho: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuarios_conselhos',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return usuarios_conselhos;
};
