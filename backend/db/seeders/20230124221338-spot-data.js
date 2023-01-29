'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1400 Manton St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 39.933579,
        lng: 75.155543,
        name: 'Single Family',
        description: '2 Story 1400sqft home',
        price: 350.00
      },
      {
        ownerId: 2,
        address: '1500 Latona St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 40.545579,
        lng: 80.546967,
        name: 'Duplex',
        description: '3 Story 1800sqft home',
        price: 400.00
      },
      {
        ownerId: 3,
        address: '1925 Federal St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 27.687479,
        lng: 57.332589,
        name: 'Apartment',
        description: '2 bedroom apartment',
        price: 425.00
      },
      {
        ownerId: 4,
        address: '1925 Federal St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 27.687479,
        lng: 57.332589,
        name: 'Apartment',
        description: '2 bedroom apartment',
        price: 425.00
      },
      {
        ownerId: 5,
        address: '1999 Reed St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 27.687479,
        lng: 57.332589,
        name: 'Apartment',
        description: '2 bedroom apartment',
        price: 425.00
      },
      {
        ownerId: 6,
        address: '2432 Frankford St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 27.687479,
        lng: 57.332589,
        name: 'Apartment',
        description: '2 bedroom apartment',
        price: 425.00
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
