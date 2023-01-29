'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'image url',
        preview: true
      },
      {
        spotId: 2,
        url: 'image url',
        preview: true
      },
      {
        spotId: 3,
        url: 'image url',
        preview: true
      },
      {
        spotId: 4,
        url: 'image url',
        preview: true
      },
      {
        spotId: 5,
        url: 'image url',
        preview: true
      },
      {
        spotId: 6,
        url: 'image url',
        preview: true
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
