const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class ambientes_termos_teleconsulta extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
      }
    }
    ambientes_termos_teleconsulta.init({
      id_ambiente: DataTypes.STRING,
      termos_teleconsulta: DataTypes.STRING,
      id_usuario: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'ambientes_termos_teleconsulta',
      timestamps: true,
      freezeTableName: true,
      createdAt: 'data_hora_criacao',
      updatedAt: 'data_hora_atualizacao',
    });
    return ambientes_termos_teleconsulta;
  };
  