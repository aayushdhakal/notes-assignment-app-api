'use strict';

var dv = require('../contants/defaultValuesForSeeding');
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: function up(queryInterface, Sequelize) {
    var valuesToDatabase;
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
            */
            valuesToDatabase = [{
              id: dv.rugsCollection.rugs1,
              user_id: dv.usersCollection.user1,
              group_id: dv.groupsCollection.group1,
              roles_id: dv.rolesCollection.rolesS,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs2,
              user_id: dv.usersCollection.user2,
              group_id: dv.groupsCollection.group1,
              roles_id: dv.rolesCollection.rolesU,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs3,
              user_id: dv.usersCollection.user3,
              group_id: dv.groupsCollection.group1,
              roles_id: dv.rolesCollection.rolesA,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs4,
              user_id: dv.usersCollection.user2,
              group_id: dv.groupsCollection.group3,
              roles_id: dv.rolesCollection.rolesS,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs5,
              user_id: dv.usersCollection.user2,
              group_id: dv.groupsCollection.group2,
              roles_id: dv.rolesCollection.rolesS,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs6,
              user_id: dv.usersCollection.user3,
              group_id: dv.groupsCollection.group2,
              roles_id: dv.rolesCollection.rolesA,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs7,
              user_id: dv.usersCollection.user4,
              group_id: dv.groupsCollection.group3,
              roles_id: dv.rolesCollection.rolesM,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rugsCollection.rugs8,
              user_id: dv.usersCollection.user4,
              group_id: dv.groupsCollection.group1,
              roles_id: dv.rolesCollection.rolesM,
              createdAt: new Date(),
              updatedAt: new Date()
            }];
            _context.next = 3;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('roles_user_groups', valuesToDatabase));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
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
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('roles_user_groups', null, {}));

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