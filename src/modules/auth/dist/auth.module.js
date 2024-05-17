"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var users_module_1 = require("../users/users.module");
var local_auth_guard_1 = require("./guards/local-auth.guard");
var jwt_strategy_1 = require("./jwt.strategy");
var jwt_1 = require("@nestjs/jwt");
var jwt_service_1 = require("./jwt.service");
var jwt_guard_1 = require("./guards/jwt.guard");
var local_strategy_1 = require("./local.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                users_module_1.UsersModule,
                jwt_1.JwtModule.register({
                    global: true,
                    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }
                })
            ],
            providers: [
                auth_service_1.AuthService,
                local_auth_guard_1.LocalAuthGuard,
                local_strategy_1.LocalStrategy,
                jwt_strategy_1.JwtStrategy,
                jwt_service_1["default"],
                jwt_guard_1.JwtAuthGuardProvider //this is the JWT providers which is used for global guards and is intanciated globally in every route,// In here we extend the strategy of JwtStrategy to ,we use  class JwtAuthGuard as provider
                //  export const JwtAuthGuardProvider ={ provide:APP_GUARD, useClass:JwtAuthGuard }
            ],
            controllers: [auth_controller_1.AuthController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
