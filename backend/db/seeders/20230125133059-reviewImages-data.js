'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'image url'
      },
      {
        reviewId: 2,
        url: 'image url'
      },
      {
        reviewId: 3,
        url: 'image url'
      },
      {
        reviewId: 4,
        url: 'image url'
      },
      {
        reviewId: 5,
        url: 'image url'
      },
      {
        reviewId: 6,
        url: 'image url'
      },
      {
        reviewId: 7,
        url: 'image url'
      },
      {
        reviewId: 8,
        url: 'image url'
      },
      {
        reviewId: 9,
        url: 'image url'
      },
      {
        reviewId: 10,
        url: 'image url'
      },
      {
        reviewId: 11,
        url: 'image url'
      },
      {
        reviewId: 12,
        url: 'image url'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
