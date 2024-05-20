"use strict";

var dotenv = require('dotenv');

dotenv.config();
var processValue = process.env;
var config = {
  "development": {
    "username": processValue.DB_USERNAME,
    "password": processValue.DB_PASSWORD,
    "database": processValue.DB_NAME_DEVELOPMENT,
    "host": processValue.DB_HOST,
    "dialect": processValue.DB_DIALECT
  },
  "test": {
    "username": processValue.DB_USERNAME,
    "password": processValue.DB_PASSWORD,
    "database": processValue.DB_NAME_TEST,
    "host": processValue.DB_HOST,
    "dialect": processValue.DB_DIALECT
  },
  "production": {
    "username": processValue.DB_USERNAME,
    "password": processValue.DB_PASSWORD,
    "database": processValue.DB_NAME_PRODUCTION,
    "host": processValue.DB_HOST,
    "dialect": processValue.DB_DIALECT
  }
};
module.exports = config;