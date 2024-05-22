'use strict';

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
    return await queryInterface.bulkInsert('notes', [
      {
        id:dv.notesCollection.notes1,
        name: 'note one',
        description: 'This is note one',
        node_code:'note_one',
        is_active:true,
        view_type:public,
        owner_id:dv.usersCollection.user1,
        group_id:dv.groupsCollection.group1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.notesCollection.notes2,
        name: 'note two',
        description: 'This is note two',
        node_code:'note_two',
        is_active:true,
        view_type:public,
        owner_id:dv.usersCollection.user2,
        group_id:dv.groupsCollection.group1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.notesCollection.notes3,
        name: 'note three',
        description: 'This is note three',
        node_code:'note_three',
        is_active:true,
        view_type:public,
        owner_id:dv.usersCollection.user2,
        group_id:dv.groupsCollection.group1
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

    await queryInterface.bulkDelete('notes',null,{})
  }
};
