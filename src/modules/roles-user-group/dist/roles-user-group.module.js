"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesUserGroupModule = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("src/core/constants");
var rolesUserGroup_model_1 = require("src/core/db/models/rolesUserGroup.model");
var roles_user_group_service_1 = require("./roles-user-group.service");
var roles_user_group_controller_1 = require("./roles-user-group.controller");
var RolesUserGroupModule = /** @class */ (function () {
    function RolesUserGroupModule() {
    }
    RolesUserGroupModule = __decorate([
        common_1.Module({
            providers: [
                {
                    provide: constants_1.USERS_ROLES_GROUP_REPOSITORY,
                    useValue: rolesUserGroup_model_1.RolesUserGroup
                },
                roles_user_group_service_1.RolesUserGroupService,
            ],
            controllers: [roles_user_group_controller_1.RolesUserGroupController],
            exports: [roles_user_group_service_1.RolesUserGroupService]
        })
    ], RolesUserGroupModule);
    return RolesUserGroupModule;
}());
exports.RolesUserGroupModule = RolesUserGroupModule;
