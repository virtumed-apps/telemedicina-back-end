const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios_horarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios_horarios.init({
    id_ambiente: DataTypes.STRING,
    dias_semana: DataTypes.ARRAY(DataTypes.INTEGER),
    id_usuario: DataTypes.INTEGER,
    horario_final: DataTypes.STRING,
    horario_inicial: DataTypes.STRING,
    data_limite: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuarios_horarios',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return usuarios_horarios;
};
