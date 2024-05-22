'use strict';
const bcrypt = require('bcrypt');
const  dv = require('../contants/defaultValuesForSeeding');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert('users',[
      {
        id: dv.usersCollection.user1,
        name:'user1',
        username:'user1',
        password: await bcrypt.hash('password',10),
        email:'user1@gmail.com',
        phoneNumber:'9803212323',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: dv.usersCollection.user2,
        name:'user2',
        username:'user2',
        password: await bcrypt.hash('password',10),
        email:'user2@gmail.com',
        phoneNumber:'9803212322',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: dv.usersCollection.user3,
        name:'user3',
        username:'user3',
        password: await bcrypt.hash('password',10),
        email:'user3@gmail.com',
        phoneNumber:'9803122322',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('users',null,{});
  }
};
