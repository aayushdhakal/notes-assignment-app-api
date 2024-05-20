"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesModule = void 0;
var common_1 = require("@nestjs/common");
var roles_service_1 = require("./roles.service");
var constants_1 = require("src/core/constants");
var roles_model_1 = require("src/core/db/models/roles.model");
var RolesModule = /** @class */ (function () {
    function RolesModule() {
    }
    RolesModule = __decorate([
        common_1.Module({
            providers: [
                roles_service_1.RolesService,
                {
                    provide: constants_1.ROLES_REPOSITORY,
                    useValue: roles_model_1.Roles
                }
            ]
        })
    ], RolesModule);
    return RolesModule;
}());
exports.RolesModule = RolesModule;
