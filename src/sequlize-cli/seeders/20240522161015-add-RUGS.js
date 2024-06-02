'use strict';
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
    
    const valuesToDatabase = [
      {
        id:dv.rugsCollection.rugs1,
        user_id: dv.usersCollection.user1,
        group_id:dv.groupsCollection.group1,
        role_id:dv.rolesCollection.rolesS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs2,
        user_id: dv.usersCollection.user2,
        group_id:dv.groupsCollection.group1,
        role_id:dv.rolesCollection.rolesU,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs3,
        user_id: dv.usersCollection.user3,
        group_id:dv.groupsCollection.group1,
        role_id:dv.rolesCollection.rolesA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs4,
        user_id: dv.usersCollection.user2,
        group_id:dv.groupsCollection.group3,
        role_id:dv.rolesCollection.rolesS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs5,
        user_id: dv.usersCollection.user2,
        group_id:dv.groupsCollection.group2,
        role_id:dv.rolesCollection.rolesS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs6,
        user_id: dv.usersCollection.user3,
        group_id:dv.groupsCollection.group2,
        role_id:dv.rolesCollection.rolesA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs7,
        user_id: dv.usersCollection.user4,
        group_id:dv.groupsCollection.group3,
        role_id:dv.rolesCollection.rolesM,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:dv.rugsCollection.rugs8,
        user_id: dv.usersCollection.user4,
        group_id:dv.groupsCollection.group1,
        role_id:dv.rolesCollection.rolesM,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  
    return await queryInterface.bulkInsert('roles_user_groups', valuesToDatabase );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('roles_user_groups',null,{});
  }
};
