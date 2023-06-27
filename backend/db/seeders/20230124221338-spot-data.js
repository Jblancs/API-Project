'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';

// Seeder helper functions ------------------------------
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

let homeAdj = ['Vacation', 'Rental', 'Comfy', 'Amazing', 'Relaxing', 'Great']

const spotSeed = () => {
  let upArray = []
  for(let i = 0; i < 20; i++){
    let spot = {
      ownerId: getRandomInt(1,7),
      address: `${1400 + i} Manton St`,
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      lat: 39.933579,
      lng: 75.155543,
      name: `${homeAdj[getRandomInt(0,6)]} Home`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      price: 350.00 + i
    }
    upArray.push(spot)
  }
  return upArray
}

const spotSeedUndo = () => {
  let downArray = []
  for(let i = 1; i < 8; i++){
    downArray.push(i)
  }
  return downArray
}

// Seeder -------------------------------------------------

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, spotSeed()
      // [
      //   {
      //     ownerId: 1,
      //     address: '1400 Manton St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 39.933579,
      //     lng: 75.155543,
      //     name: 'malesuada fames',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 350.00
      //   },
      //   {
      //     ownerId: 2,
      //     address: '1500 Latona St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 40.545579,
      //     lng: 80.546967,
      //     name: 'malesuada fames',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 400.00
      //   },
      //   {
      //     ownerId: 3,
      //     address: '1925 Federal St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 27.687479,
      //     lng: 57.332589,
      //     name: 'malesuada fames',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 425.00
      //   },
      //   {
      //     ownerId: 4,
      //     address: '1925 Federal St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 27.687479,
      //     lng: 57.332589,
      //     name: 'malesuada fames',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 425.00
      //   },
      //   {
      //     ownerId: 5,
      //     address: '1999 Reed St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 27.687479,
      //     lng: 57.332589,
      //     name: 'malesuada fames',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 425.00
      //   },
      //   {
      //     ownerId: 6,
      //     address: '2432 Frankford St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 27.687479,
      //     lng: 57.332589,
      //     name: 'malesuada fames',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 425.00
      //   },
      //   {
      //     ownerId: 1,
      //     address: '2432 Frankford St',
      //     city: 'Philadelphia',
      //     state: 'PA',
      //     country: 'USA',
      //     lat: 27.687479,
      //     lng: 57.332589,
      //     name: 'Demo New House',
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue. Donec adipiscing tristique risus nec feugiat in. Magna etiam tempor orci eu lobortis elementum. Massa eget egestas purus viverra accumsan in nisl. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sagittis orci a scelerisque purus semper eget duis at tellus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Volutpat diam ut venenatis tellus. Nisi vitae suscipit tellus mauris a diam maecenas. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque felis imperdiet proin fermentum leo vel orci. Sit amet mauris commodo quis. Netus et malesuada fames ac turpis egestas. Volutpat sed cras ornare arcu dui vivamus.',
      //     price: 425.00
      //   }
      // ]

      , {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
