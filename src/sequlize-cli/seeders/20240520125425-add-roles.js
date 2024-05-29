'use strict';
// npx sequelize-cli seed:generate --name add-roles
const { v1:uuidv1 }  = require('uuid');

const  dv = require('../contants/defaultValuesForSeeding');
import { ROLE_SUPERUSER,ROLE_ADMIN, ROLE_MODERATOR, ROLE_USER, ROLE_GUEST , ROLE_REQUEST, ROLE_CONTRIBUTOR, ROLE_INVITATION } from 'src/core/constants';

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
        name: ROLE_SUPERUSER,
        description: 'This is superuser roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesA,
        name: ROLE_ADMIN,
        description: 'This is admin roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesM,
        name: ROLE_MODERATOR,
        description: 'This is moderator roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesU,
        name: ROLE_USER,
        description: 'This is user roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesG,
        name: ROLE_GUEST,
        description: 'This is guest roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesC,
        name: ROLE_CONTRIBUTOR,
        description: 'This is contributor user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesR,
        name: ROLE_REQUEST,
        description: 'This is request to join group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rolesCollection.rolesI,
        name:ROLE_INVITATION,
        description:"This is send invitaion to join group"
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
