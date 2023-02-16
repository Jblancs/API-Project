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
        name: 'malesuada fames',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
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
        name: 'malesuada fames',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
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
        name: 'malesuada fames',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
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
        name: 'malesuada fames',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
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
        name: 'malesuada fames',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
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
        name: 'malesuada fames',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
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
