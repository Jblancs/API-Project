const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)

const seedUsers = (num) => {
    //create new array and fill with empty space
    let users = new Array(num).fill('')

    for (const i in users) {
        users[i] = {
            //populate using faker website API docs
            username: faker.internet.userName(),
            email: faker.internet.email(),
            hashedPassword: bcrypt.hashSync(faker.internet.password())
        }
    }

    return users
}

module.exports = {
    seedUsers
}

// In seeder up function:
// let users = seedUsers(100)
// return queryInterface.bulkInsert('Users', users, {})

// In seeder down function:
// return queryInterface.bulkDelete('Users', null, {})
