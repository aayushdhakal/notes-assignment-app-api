"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesUserGroupController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../auth/guards/jwt.guard");
// Just for testing and development of the project @SkipAuth()
var RolesUserGroupController = /** @class */ (function () {
    function RolesUserGroupController(rolesUserGroupService) {
        this.rolesUserGroupService = rolesUserGroupService;
    }
    RolesUserGroupController = __decorate([
        jwt_guard_1.SkipAuth(),
        common_1.Controller('roles-user-group')
    ], RolesUserGroupController);
    return RolesUserGroupController;
}());
exports.RolesUserGroupController = RolesUserGroupController;
