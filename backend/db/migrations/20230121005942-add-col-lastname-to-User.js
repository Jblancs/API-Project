'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'lastName', {
      type: Sequelize.STRING(30)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'lastName')
  }
};
