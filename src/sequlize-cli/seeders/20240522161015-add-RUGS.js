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
        roles_id:[dv.rolesCollection.roles1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rugsCollection.rugs2,
        user_id: dv.usersCollection.user2,
        group_id:dv.groupsCollection.group1,
        roles_id:[dv.rolesCollection.roles3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rugsCollection.rugs3,
        user_id: dv.usersCollection.user3,
        group_id:dv.groupsCollection.group1,
        roles_id:[dv.rolesCollection.roles4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rugsCollection.rugs4,
        user_id: dv.usersCollection.user1,
        group_id:dv.groupsCollection.group2,
        roles_id:[dv.rolesCollection.roles2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rugsCollection.rugs5,
        user_id: dv.usersCollection.user2,
        group_id:dv.groupsCollection.group2,
        roles_id:[dv.rolesCollection.roles4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.rugsCollection.rugs6,
        user_id: dv.usersCollection.user3,
        group_id:dv.groupsCollection.group2,
        roles_id:[dv.rolesCollection.roles3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
