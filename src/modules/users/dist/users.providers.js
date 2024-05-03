"use strict";
exports.__esModule = true;
exports.usersProviders = void 0;
var constants_1 = require("src/core/constants");
var users_model_1 = require("src/core/db/models/users.model");
exports.usersProviders = [{
        provide: constants_1.USER_REPOSITORY,
        useValue: users_model_1.User
    }];
