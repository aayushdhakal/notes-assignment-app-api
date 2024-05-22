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
    return await queryInterface.bulkInsert('groups', [
      {
        id:dv.groupsCollection.group1,
        name: 'Group One',
        creator_id:dv.usersCollection.user1,
        is_active:true,
        is_public:true,
        description:'this is a demo group 1',
        group_code:'grp01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.groupsCollection.group2,
        name: 'Group Two',
        creator_id:dv.usersCollection.user1,
        is_active:true,
        is_public:true,
        description:'this is a demo group 2',
        group_code:'grp02',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.groupsCollection.group3,
        name: 'Group Three',
        creator_id:dv.usersCollection.user2,
        is_active:true,
        is_public:true,
        description:'this is a demo group 3',
        group_code:'grp03',
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
    return await queryInterface.bulkDelete('groups',null,{});
  }
};
