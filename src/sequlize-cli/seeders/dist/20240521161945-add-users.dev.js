'use strict';

var bcrypt = require('bcrypt');

var dv = require('../contants/defaultValuesForSeeding');
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = queryInterface;
            _context.t1 = dv.usersCollection.user1;
            _context.next = 4;
            return regeneratorRuntime.awrap(bcrypt.hash('password', 10));

          case 4:
            _context.t2 = _context.sent;
            _context.t3 = new Date();
            _context.t4 = new Date();
            _context.t5 = {
              id: _context.t1,
              name: 'user1',
              username: 'user1',
              password: _context.t2,
              email: 'demoUser@gmail.com',
              phoneNumber: '9803212323',
              createdAt: _context.t3,
              updatedAt: _context.t4
            };
            _context.t6 = dv.usersCollection.user3;
            _context.next = 11;
            return regeneratorRuntime.awrap(bcrypt.hash('password', 10));

          case 11:
            _context.t7 = _context.sent;
            _context.t8 = new Date();
            _context.t9 = new Date();
            _context.t10 = {
              id: _context.t6,
              name: 'user2',
              username: 'user2',
              password: _context.t7,
              email: 'user1@gmail.com',
              phoneNumber: '9803212322',
              createdAt: _context.t8,
              updatedAt: _context.t9
            };
            _context.t11 = [_context.t5, _context.t10];

            _context.t0.bulkInsert.call(_context.t0, 'users', _context.t11);

          case 17:
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