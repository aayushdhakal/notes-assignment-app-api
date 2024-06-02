'use strict';

var dv = require('../contants/defaultValuesForSeeding');
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('notes', [{
              id: dv.notesCollection.notes1,
              name: 'note one',
              description: 'This is note one',
              note_code: 'note_one',
              is_active: true,
              view_type: 'public',
              user_id: dv.usersCollection.user1,
              group_id: dv.groupsCollection.group1,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.notesCollection.notes2,
              name: 'note two',
              description: 'This is note two',
              note_code: 'note_two',
              is_active: true,
              view_type: 'public',
              user_id: dv.usersCollection.user2,
              group_id: dv.groupsCollection.group1,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.notesCollection.notes3,
              name: 'note three',
              description: 'This is note three',
              note_code: 'note_three',
              is_active: true,
              view_type: 'public',
              user_id: dv.usersCollection.user2,
              group_id: dv.groupsCollection.group1,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.notesCollection.notes4,
              name: 'note four',
              description: 'This is note four',
              note_code: 'note_four',
              is_active: true,
              view_type: 'public',
              user_id: dv.usersCollection.user1,
              group_id: dv.groupsCollection.group2,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.notesCollection.notes5,
              name: 'note five',
              description: 'This is note five',
              note_code: 'note_five',
              is_active: true,
              view_type: 'public',
              user_id: dv.usersCollection.user3,
              group_id: dv.groupsCollection.group2,
              createdAt: new Date(),
              updatedAt: new Date()
            }]));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('notes', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};