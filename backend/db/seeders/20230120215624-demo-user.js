'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      },
      {
        firstName: 'Jalen',
        lastName: 'Hurts',
        email: 'jhurts@user.io',
        username: 'JalenHurts1',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Jeff',
        lastName: 'Laurie',
        email: 'jlaurie@user.io',
        username: 'JeffLaurie1',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Jason',
        lastName: 'Kelce',
        email: 'jkelce@user.io',
        username: 'JasonKelce1',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['JohnSmith1', 'JaneDoe1', 'BobGray1', 'JalenHurts1', 'JeffLaurie1', 'JasonKelce1', 'Demo-lition'] }
    }, {});
  }
};
