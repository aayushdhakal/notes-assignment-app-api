"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var db_module_1 = require("./core/db/db.module");
var config_1 = require("@nestjs/config");
var users_module_1 = require("./modules/users/users.module");
var auth_module_1 = require("./modules/auth/auth.module");
var notes_module_1 = require("./modules/notes/notes.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                //This is the module used for the env variable and isGlobal:true enable the app to use the environment variable globally
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                db_module_1.DbModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                notes_module_1.NotesModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
