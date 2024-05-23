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
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('groups', [{
              id: dv.groupsCollection.group1,
              name: 'Group One',
              creator_id: dv.usersCollection.user1,
              is_active: true,
              is_public: true,
              description: 'this is a demo group 1',
              group_code: 'grp1',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.groupsCollection.group2,
              name: 'Group Two',
              creator_id: dv.usersCollection.user1,
              is_active: true,
              is_public: true,
              description: 'this is a demo group 2',
              group_code: 'grp2',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.groupsCollection.group3,
              name: 'Group Three',
              creator_id: dv.usersCollection.user2,
              is_active: true,
              is_public: true,
              description: 'this is a demo group 3',
              group_code: 'grp3',
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
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('groups', null, {}));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};