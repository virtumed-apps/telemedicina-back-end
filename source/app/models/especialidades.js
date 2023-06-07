const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class especialidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  especialidades.init(
    {
      id_ambiente: DataTypes.STRING,
      nome: DataTypes.STRING,
      permite_convenio: DataTypes.BOOLEAN,
      permite_particular: DataTypes.BOOLEAN,
      permite_publico: DataTypes.BOOLEAN,
      valor_consulta: DataTypes.FLOAT,
      descricao: DataTypes.STRING,
      url_imagem: DataTypes.STRING,
      duracao_consulta: DataTypes.STRING,
      pre_definido: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "especialidades",
      timestamps: true,
      freezeTableName: true,
      createdAt: "data_hora_criacao",
      updatedAt: "data_hora_atualizacao",
    }
  );
  return especialidades;
};
