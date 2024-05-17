"use strict";
exports.__esModule = true;
exports.groupTableProviders = void 0;
var group_model_1 = require("src/core/db/models/group.model");
var constants_1 = require("src/core/constants");
exports.groupTableProviders = [{
        provide: constants_1.GROUPTABLE_REPOSITORY,
        useValue: group_model_1.GroupTable
    }];
