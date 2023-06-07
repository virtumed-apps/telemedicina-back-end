const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agendamentos.init({
    data_hora: DataTypes.DATE,
    id_ambiente: DataTypes.STRING,
    id_consulta: DataTypes.STRING,
    id_convenio: DataTypes.INTEGER,
    id_especialidade: DataTypes.INTEGER,
    id_paciente: DataTypes.INTEGER,
    id_profissional: DataTypes.INTEGER,
    id_usuario_atualizacao: DataTypes.INTEGER,
    ocorrencia: DataTypes.STRING,
    status: DataTypes.STRING,
    tipo: DataTypes.STRING,
    multiplos_usuarios: DataTypes.BOOLEAN,
    presencial: DataTypes.BOOLEAN,
    queixa: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
    modelName: 'agendamentos',
  });
  return Agendamentos;
};
