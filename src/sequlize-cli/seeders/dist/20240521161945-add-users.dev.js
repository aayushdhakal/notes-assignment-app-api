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
              email: 'user1@gmail.com',
              phoneNumber: '9803212323',
              createdAt: _context.t3,
              updatedAt: _context.t4
            };
            _context.t6 = dv.usersCollection.user2;
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
              email: 'user2@gmail.com',
              phoneNumber: '9803212322',
              createdAt: _context.t8,
              updatedAt: _context.t9
            };
            _context.t11 = dv.usersCollection.user3;
            _context.next = 18;
            return regeneratorRuntime.awrap(bcrypt.hash('password', 10));

          case 18:
            _context.t12 = _context.sent;
            _context.t13 = new Date();
            _context.t14 = new Date();
            _context.t15 = {
              id: _context.t11,
              name: 'user3',
              username: 'user3',
              password: _context.t12,
              email: 'user3@gmail.com',
              phoneNumber: '9803122322',
              createdAt: _context.t13,
              updatedAt: _context.t14
            };
            _context.t16 = dv.usersCollection.user4;
            _context.next = 25;
            return regeneratorRuntime.awrap(bcrypt.hash('password', 10));

          case 25:
            _context.t17 = _context.sent;
            _context.t18 = new Date();
            _context.t19 = new Date();
            _context.t20 = {
              id: _context.t16,
              name: 'user4',
              username: 'user4',
              password: _context.t17,
              email: 'user4@gmail.com',
              phoneNumber: '9803122311',
              createdAt: _context.t18,
              updatedAt: _context.t19
            };
            _context.t21 = [_context.t5, _context.t10, _context.t15, _context.t20];

            _context.t0.bulkInsert.call(_context.t0, 'users', _context.t21);

          case 31:
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
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};