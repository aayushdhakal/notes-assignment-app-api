"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.databaseConfig = void 0;
var dotenv = require("dotenv");
dotenv.config();
var processValue = process.env;
var defaultValue = {
    username: processValue.DB_USERNAME,
    password: processValue.DB_PASSWORD,
    host: processValue.DB_HOST,
    port: processValue.DB_PORT,
    dialect: processValue.DB_DIALECT
};
exports.databaseConfig = {
    test: __assign(__assign({}, defaultValue), { database: processValue.DB_NAME_TEST }),
    development: __assign(__assign({}, defaultValue), { database: processValue.DB_NAME_DEVELOPMENT }),
    production: __assign(__assign({}, defaultValue), { database: processValue.DB_NAME_PRODUCTION })
};
