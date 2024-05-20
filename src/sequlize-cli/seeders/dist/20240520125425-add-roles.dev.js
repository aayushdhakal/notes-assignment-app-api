'use strict';

var _require = require('uuid'),
    uuidv1 = _require.v1;
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.bulkInsert('roles', [{
              id: uuidv1(),
              name: 'admin',
              description: 'This is admin roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: uuidv1(),
              name: 'users',
              description: 'This is user roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: uuidv1(),
              name: 'moderator',
              description: 'This is moderator roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: uuidv1(),
              name: 'guest',
              description: 'This is guest roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: uuidv1(),
              name: 'superuser',
              description: 'This is superuser roles',
              createdAt: new Date(),
              updatedAt: new Date()
            }]));

          case 1:
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
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};