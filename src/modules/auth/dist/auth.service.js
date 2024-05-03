"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    AuthService.prototype.validateUser = function (username, enteredPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, match, _a, password, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOneByUsername(username)];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.usersService.findOneByEmail(username)];
                    case 2:
                        user = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.comparePassword(enteredPassword, user.password)];
                    case 4:
                        match = _b.sent();
                        if (!match) {
                            return [2 /*return*/, null];
                        }
                        _a = user['dataValues'], password = _a.password, result = __rest(_a, ["password"]);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AuthService.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var access_token, refresh_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jwtService.generateAccessToken(user)];
                    case 1:
                        access_token = _a.sent();
                        return [4 /*yield*/, this.jwtService.generateRefreshToken(user)];
                    case 2:
                        refresh_token = _a.sent();
                        return [2 /*return*/, { user: user, access_token: access_token, refresh_token: refresh_token }];
                }
            });
        });
    };
    AuthService.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var pass, newUser, _a, password, result, access_token, refresh_token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.hashPassword(user.password)];
                    case 1:
                        pass = _b.sent();
                        return [4 /*yield*/, this.usersService.create(__assign(__assign({}, user), { password: pass }))];
                    case 2:
                        newUser = _b.sent();
                        _a = newUser['dataValues'], password = _a.password, result = __rest(_a, ["password"]);
                        return [4 /*yield*/, this.jwtService.generateAccessToken(result)];
                    case 3:
                        access_token = _b.sent();
                        return [4 /*yield*/, this.jwtService.generateRefreshToken(result)];
                    case 4:
                        refresh_token = _b.sent();
                        return [2 /*return*/, { user: result, access_token: access_token, refresh_token: refresh_token }];
                }
            });
        });
    };
    AuthService.prototype.getAccessTokenFromRefreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenData, access_token, refresh_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jwtService.verifyRefreshToken({ token: refreshToken })];
                    case 1:
                        tokenData = _a.sent();
                        if (!tokenData.isValid) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.jwtService.generateAccessToken({ user: tokenData.data })];
                    case 2:
                        access_token = _a.sent();
                        return [4 /*yield*/, this.jwtService.generateRefreshToken({ user: tokenData.data })];
                    case 3:
                        refresh_token = _a.sent();
                        return [2 /*return*/, { user: tokenData.data, access_token: access_token, refresh_token: refresh_token }];
                    case 4: return [2 /*return*/, "Token data is Invalid"];
                }
            });
        });
    };
    AuthService.prototype.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, hash];
                }
            });
        });
    };
    AuthService.prototype.comparePassword = function (enteredPassword, dbPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.compare(enteredPassword, dbPassword)];
                    case 1:
                        match = _a.sent();
                        return [2 /*return*/, match];
                }
            });
        });
    };
    AuthService.prototype.updateUserPassword = function (_a, id) {
        var oldPassword = _a.oldPassword, newPassword = _a.newPassword;
        return __awaiter(this, void 0, void 0, function () {
            var user, checkPassword, newHashedPassword, _b, password, rest;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOneById(id)];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, this.comparePassword(oldPassword, user.dataValues['password'])];
                    case 2:
                        checkPassword = _c.sent();
                        if (!checkPassword) {
                            throw new common_1.BadRequestException('Invalid password');
                        }
                        return [4 /*yield*/, this.hashPassword(newPassword)];
                    case 3:
                        newHashedPassword = _c.sent();
                        user.password = newHashedPassword;
                        user.save();
                        _b = user['dataValues'], password = _b.password, rest = __rest(_b, ["password"]);
                        return [2 /*return*/, { message: "Password has changed", rest: rest }];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
