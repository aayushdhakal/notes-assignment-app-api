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
exports.NotesModule = void 0;
var common_1 = require("@nestjs/common");
var notes_providers_1 = require("./notes.providers");
var notes_service_1 = require("./notes.service");
var notes_controller_1 = require("./notes.controller");
var group_module_1 = require("../group/group.module");
var roles_user_group_module_1 = require("../roles-user-group/roles-user-group.module");
var roles_module_1 = require("../roles/roles.module");
var roles_guard_1 = require("../group/guards/roles.guard");
// import { RolesGuard } from './guards/roles.guard';
var NotesModule = /** @class */ (function () {
    function NotesModule() {
    }
    NotesModule = __decorate([
        common_1.Module({
            providers: __spreadArrays([
                notes_service_1.NotesService
            ], notes_providers_1.notesProviders, [
                roles_guard_1.RolesGuard
            ]),
            imports: [
                roles_user_group_module_1.RolesUserGroupModule,
                roles_module_1.RolesModule,
                group_module_1.GroupModule
            ],
            exports: [notes_service_1.NotesService],
            controllers: [notes_controller_1.NotesController]
        })
    ], NotesModule);
    return NotesModule;
}());
exports.NotesModule = NotesModule;
