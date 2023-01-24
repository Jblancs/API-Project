'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'jsmith@user.io',
        username: 'JohnSmith1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jdoe@user.io',
        username: 'JaneDoe1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Bob',
        lastName: 'Gray',
        email: 'bgray@user.io',
        username: 'BobGray1',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['JohnSmith1', 'JaneDoe1', 'BobGray1'] }
    }, {});
  }
};
