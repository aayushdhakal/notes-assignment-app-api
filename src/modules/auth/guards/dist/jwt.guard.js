"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SkipGetReqAuth = exports.SkipAuth = exports.JwtAuthGuardProvider = exports.JwtAuthGuard = void 0;
// If we look closely on the documentation an the practises The name suggest that it is and AuthGuard('jwt') in the brackets we have 'jwt' which means that this file is the extention of the file jwt.strategy.ts on auth folder similarly the local-auth.guard.ts is the extention file of the local.strategy.ts file
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var passport_1 = require("@nestjs/passport");
var jwtConfig = process.env;
// export class JwtAuthGuard extends AuthGuard(['strategy_jwt_1', 'strategy_jwt_2', '...']) { ... }
var JwtAuthGuard = /** @class */ (function (_super) {
    __extends(JwtAuthGuard, _super);
    function JwtAuthGuard(reflector, jwtService) {
        var _this = _super.call(this) || this;
        _this.reflector = reflector;
        _this.jwtService = jwtService;
        return _this;
    }
    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    JwtAuthGuard.prototype.canActivate = function (context) {
        var _this = this;
        var request = context.switchToHttp().getRequest();
        // if the handler has @SkipAuth,@SkipGetReqAuth decorator this below function will stop the process of authorization ,checking if the key(metadata) exits or not
        var isThisAuthFound = function (key) {
            return _this.reflector.getAllAndOverride(key, [
                // <boolean> in above is appected output of this function which is 0 or 1.if there is a decorator of @SkipAuth() in the function or the class this getHandler() and getClass() will have class resulting in true(1)
                context.getHandler(),
                context.getClass(),
            ]);
        };
        // check if the metadata has "IS_SKIP_AUTH" and "IS_GET_METHOD_AUTH" is present on the request or not
        var isPublic = isThisAuthFound('IS_SKIP_AUTH');
        var isGetReqAuth = isThisAuthFound('IS_GET_METHOD_AUTH');
        if (isPublic)
            return true;
        if (isGetReqAuth && String(request.method).toLowerCase() === 'get')
            return true;
        // console.log('this is from jwt.guard',context.getHandler().name,context.getClass().name);
        //get the  token from header and extract it and store it in token
        var token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Access Token Not Found-Unauthorized');
        }
        //get the token and validate them
        var tokenData = this.validateToken(token);
        return _super.prototype.canActivate.call(this, context);
    };
    // Currently the token we have is being validated by the signature token only
    JwtAuthGuard.prototype.validateToken = function (token) {
        var _a;
        // console.log(token);
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                issuer: process.env.JWT_ISSUER
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Invalid Access Token-Unauthorized');
        }
    };
    //this request is taken from express library
    JwtAuthGuard.prototype.extractTokenFromHeader = function (req) {
        var _a;
        // This is so that the bearer and the token is seperated  from each other in simple language processing of the token
        var authHeader = req.headers.authorization;
        var _b = (_a = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')) !== null && _a !== void 0 ? _a : [], type = _b[0], token = _b[1];
        return type === 'Bearer' ? token : undefined;
    };
    JwtAuthGuard = __decorate([
        common_1.Injectable()
    ], JwtAuthGuard);
    return JwtAuthGuard;
}(passport_1.AuthGuard('jwt')));
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuardProvider = {
    provide: core_1.APP_GUARD,
    useClass: JwtAuthGuard
};
// here we have the function to set the meta data if we run this function on the method
// if we put this as the alias in the method or to the class then this will stop the jwt authentication to process
// inside of the class JwtAuthGuard canActivate  method with isThisAuthFound() method will not let process further
// In laymans terms this makes the class and the route public if added to the controller for this we use "Reflector Class"
exports.SkipAuth = function () { return common_1.SetMetadata('IS_SKIP_AUTH', true); };
exports.SkipGetReqAuth = function () { return common_1.SetMetadata('IS_GET_METHOD_AUTH', true); };
