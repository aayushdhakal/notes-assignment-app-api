'use strict';

const { v1:uuidv1 }  = require('uuid');

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
    return queryInterface.bulkInsert('roles', [
      {
        id:uuidv1(),
        name: 'admin',
        description: 'This is admin roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:uuidv1(),
        name: 'users',
        description: 'This is user roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:uuidv1(),
        name: 'moderator',
        description: 'This is moderator roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:uuidv1(),
        name: 'guest',
        description: 'This is guest roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:uuidv1(),
        name: 'superuser',
        description: 'This is superuser roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
