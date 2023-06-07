const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class errata_paciente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    errata_paciente.init({
        id_profissional: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        id_informacoes_complementares: DataTypes.INTEGER,
        profissional: DataTypes.STRING,
        id_profissional: DataTypes.INTEGER,
        errata: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'errata_paciente',
        timestamps: true,
        freezeTableName: true,
        createdAt: 'data_hora_criacao',
        updatedAt: 'data_hora_atualizacao',
    });
    return errata_paciente;
};
