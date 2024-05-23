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
    return await queryInterface.bulkInsert('notes', [
      {
        id:dv.notesCollection.notes1,
        name: 'note one',
        description: 'This is note one',
        note_code:'note_one',
        is_active:true,
        view_type:'public',
        owner_id:dv.usersCollection.user1,
        group_id:dv.groupsCollection.group1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.notesCollection.notes2,
        name: 'note two',
        description: 'This is note two',
        note_code:'note_two',
        is_active:true,
        view_type:'public',
        owner_id:dv.usersCollection.user2,
        group_id:dv.groupsCollection.group1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.notesCollection.notes3,
        name: 'note three',
        description: 'This is note three',
        note_code:'note_three',
        is_active:true,
        view_type:'public',
        owner_id:dv.usersCollection.user2,
        group_id:dv.groupsCollection.group1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.notesCollection.notes4,
        name: 'note four',
        description: 'This is note four',
        note_code:'note_four',
        is_active:true,
        view_type:'public',
        owner_id:dv.usersCollection.user1,
        group_id:dv.groupsCollection.group2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:dv.notesCollection.notes5,
        name: 'note five',
        description: 'This is note five',
        note_code:'note_five',
        is_active:true,
        view_type:'public',
        owner_id:dv.usersCollection.user3,
        group_id:dv.groupsCollection.group2,
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
