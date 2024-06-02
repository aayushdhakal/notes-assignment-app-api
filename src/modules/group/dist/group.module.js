"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.GroupModule = void 0;
var common_1 = require("@nestjs/common");
var group_service_1 = require("./group.service");
var group_controller_1 = require("./group.controller");
var group_providers_1 = require("./group.providers");
var roles_guard_1 = require("./guards/roles.guard");
var roles_module_1 = require("../roles/roles.module");
var roles_user_group_module_1 = require("../roles-user-group/roles-user-group.module");
var notes_module_1 = require("../notes/notes.module");
var GroupModule = /** @class */ (function () {
    function GroupModule() {
    }
    GroupModule = __decorate([
        common_1.Module({
            providers: __spreadArrays([group_service_1.GroupService], group_providers_1.groupTableProviders, [roles_guard_1.RolesGuard]),
            controllers: [group_controller_1.GroupController],
            exports: [group_service_1.GroupService, roles_guard_1.RolesGuard],
            imports: [
                roles_module_1.RolesModule,
                roles_user_group_module_1.RolesUserGroupModule,
                common_1.forwardRef(function () { return notes_module_1.NotesModule; })
            ]
        })
    ], GroupModule);
    return GroupModule;
}());
exports.GroupModule = GroupModule;
