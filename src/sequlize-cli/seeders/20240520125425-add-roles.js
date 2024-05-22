'use strict';
// npx sequelize-cli seed:generate --name add-roles
const { v1:uuidv1 }  = require('uuid');

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
    return await queryInterface.bulkInsert('roles', [
      {
        id:dv.rolesCollection.roles1,
        name: 'superuser',
        description: 'This is superuser roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.roles2,
        name: 'admin',
        description: 'This is admin roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.roles3,
        name: 'moderator',
        description: 'This is moderator roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.roles4,
        name: 'users',
        description: 'This is user roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.roles5,
        name: 'guest',
        description: 'This is guest roles',
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

    await queryInterface.bulkDelete('roles',null,{});
  }
};
