'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('usuarios', 'passaporte', {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // });
  },

  async down(queryInterface) {
    // await queryInterface.removeColumn('usuarios', 'passaporte');
  }
};
