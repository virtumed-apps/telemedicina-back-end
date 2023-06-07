const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios_especialidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios_especialidades.init({
    id_ambiente: DataTypes.STRING,
    duracao: DataTypes.STRING,
    duracao_limite: DataTypes.INTEGER,
    id_especialidade: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    valor_consulta: DataTypes.FLOAT,
    split_valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'usuarios_especialidades',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });

  return usuarios_especialidades;
};
