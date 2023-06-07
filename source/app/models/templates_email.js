const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class templates_email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  templates_email.init({
    id_ambiente: DataTypes.STRING,
    corpo: DataTypes.INTEGER,
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'templates_email',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'data_hora_criacao',
    updatedAt: 'data_hora_atualizacao',
  });
  return templates_email;
};
