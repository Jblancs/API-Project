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
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 1
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 3
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 1


      },
      {
        spotId: 4,
        userId: 5,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 5
      },
      {
        spotId: 4,
        userId: 6,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 1
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 1
      },
      {
        spotId: 6,
        userId: 4,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa. ',
        stars: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
