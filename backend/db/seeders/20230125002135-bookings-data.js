'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Bookings';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('10-01-2023'),
        endDate: new Date('10-07-2023')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('12-08-2023'),
        endDate: new Date('12-15-2023')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('11-16-2023'),
        endDate: new Date('11-22-2023')
      },
      {
        spotId: 4,
        userId: 5,
        startDate: new Date('12-16-2023'),
        endDate: new Date('12-20-2023')
      },
      {
        spotId: 5,
        userId: 6,
        startDate: new Date('12-16-2023'),
        endDate: new Date('12-20-2023')
      },
      {
        spotId: 6,
        userId: 4,
        startDate: new Date('12-16-2023'),
        endDate: new Date('12-20-2023')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
