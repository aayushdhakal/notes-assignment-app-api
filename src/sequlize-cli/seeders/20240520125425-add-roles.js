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
        id:dv.rolesCollection.rolesS,
        name:'superuser',
        description: 'This is superuser roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesA,
        name: 'admin',
        description: 'This is admin roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesM,
        name: 'moderator',
        description: 'This is moderator roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesU,
        name: 'user',
        description: 'This is user roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesG,
        name: 'guest',
        description: 'This is guest roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesC,
        name: 'contributor',
        description: 'This is contributor user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesR,
        name: 'request',
        description: 'This is request to join group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesI,
        name:'invitation',
        description:"This is send invitaion to join group",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesB,
        name:'banned',
        description:"This is send invitaion to join group",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
