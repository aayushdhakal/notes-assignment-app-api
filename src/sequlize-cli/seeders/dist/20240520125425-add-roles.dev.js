'use strict'; // npx sequelize-cli seed:generate --name add-roles

var _require = require('uuid'),
    uuidv1 = _require.v1;

var dv = require('../contants/defaultValuesForSeeding');
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('roles', [{
              id: dv.rolesCollection.roles1,
              name: 'admin',
              description: 'This is admin roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rolesCollection.roles2,
              name: 'users',
              description: 'This is user roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rolesCollection.roles3,
              name: 'moderator',
              description: 'This is moderator roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rolesCollection.roles4,
              name: 'guest',
              description: 'This is guest roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: dv.rolesCollection.roles5,
              name: 'superuser',
              description: 'This is superuser roles',
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
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('users', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};