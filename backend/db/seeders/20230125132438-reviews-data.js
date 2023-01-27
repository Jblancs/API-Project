'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Reviews';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'great place with nice view',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'would come back again',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'amazing host!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'meh',
        stars: 2
      },
      {
        spotId: 1,
        userId: 3,
        review: 'nice',
        stars: 3
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
