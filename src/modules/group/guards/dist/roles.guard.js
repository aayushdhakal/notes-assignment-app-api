"use strict";
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
exports.__esModule = true;
exports.Roles = exports.SkipRoleGuard = exports.RolesGuard = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var constants_1 = require("src/core/constants");
var RolesGuard = /** @class */ (function () {
    function RolesGuard(reflector, rolesUserGroupService, noteService) {
        this.reflector = reflector;
        this.rolesUserGroupService = rolesUserGroupService;
        this.noteService = noteService;
    }
    RolesGuard.prototype.canActivate = function (context) {
        var _this = this;
        // console.log("Running the Role Guard: Class Name:-"+context.getClass(),"Handler Name"+context.getHandler());
        var request = context.switchToHttp().getRequest();
        // Function Declaration 
        var isThisAuthFound = function (key) {
            return _this.reflector.getAllAndOverride(key, [
                context.getHandler(),
                context.getClass(),
            ]);
        };
        var isSkipRoleGuard = isThisAuthFound('SkipRoleGuard');
        if (isSkipRoleGuard)
            return true;
        //this is to get the roles on the controller like admin,moderator,user,so on.
        // If the @Roles(['superuser','admin']) is provided then this will send this array of superuser,admin
        var roles = this.reflector.get(exports.Roles, context.getHandler());
        return this.validateGroupRolesAndReturnRoles(request, roles, { className: context.getClass().name, handlerName: context.getHandler().name });
        // In above context we have the userId in place along with the groupId and we can view the type of user in the group and the method he is trying to access we can now set the @Roles on the methods on the group to identify the permission which can do what in the roles guard
        // At first we need to check the permission wheather the userId belongs to the group or not 
        // for example In group controller class we can set the patch method that can be worked on by moderator by setting @Roles('moderator','admin','superadmin') we can say he has the permission for it by checking on the logic and such
    };
    RolesGuard.prototype.validateGroupRolesAndReturnRoles = function (request, roles, runningClassname) {
        return __awaiter(this, void 0, void 0, function () {
            var valueTemp, roleOfUserOnGroup, groupInfo, note, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('running Roles Guard');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.rolesUserGroupService.getGroupsRolesFromUserId(request.query.group, request.user.id)];
                    case 2:
                        valueTemp = _b.sent();
                        roleOfUserOnGroup = valueTemp[0].dataValues.role.dataValues.name;
                        //checking th role of the user in the group
                        if (roleOfUserOnGroup == constants_1.ROLE_BANNED) {
                            throw new common_1.UnauthorizedException('You are banned from this group');
                        }
                        else if (roleOfUserOnGroup == constants_1.ROLE_REQUEST) {
                            throw new common_1.UnauthorizedException('Your Request for Joining the group is still pending!.');
                        }
                        else if (roleOfUserOnGroup == constants_1.ROLE_INVITATION) {
                            throw new common_1.UnauthorizedException('You have not accepted to join this group.Please accept to continue or else deny the Invitation.');
                        }
                        console.log("roleOfUserOnGroup:- " + roleOfUserOnGroup + " location:'roles.guard.ts'");
                        groupInfo = {
                            groupId: valueTemp[0].dataValues.group_id,
                            groupName: valueTemp[0].group.dataValues.name
                        };
                        if (!(runningClassname.className == "NotesController" && runningClassname.handlerName != "createNote")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.noteService.findOneByNoteId(request.query.group, request.query.note)];
                    case 3:
                        note = _b.sent();
                        if (note.dataValues.user_id == request.user.id) {
                            request.isNoteOwner = true;
                        }
                        _b.label = 4;
                    case 4:
                        // check if the user has the valid permission or role for the group or not if id doen't return error
                        if (!roles.includes(roleOfUserOnGroup)) {
                            if (request.isNoteOwner != true) {
                                console.log("UnauthorizedException location:'roles.guard.ts'");
                                throw { message: "You are not authorized to perform this action" };
                                // throw new UnauthorizedException('You are not authorized to perform this action');
                            }
                        }
                        _a = request;
                        return [4 /*yield*/, {
                                userRole: roleOfUserOnGroup,
                                RoleId: valueTemp[0].dataValues.role.dataValues.id,
                                group: groupInfo
                            }];
                    case 5:
                        _a.userGroupInfo = _b.sent();
                        // console.log(request.userGroupInfo);
                        console.log('Role Guard is Active and Workings');
                        return [2 /*return*/, request];
                    case 6:
                        e_1 = _b.sent();
                        if (e_1.message) {
                            throw new common_1.UnauthorizedException({ msg: e_1, message: e_1.message || 'Group Not Found!' });
                        }
                        throw new common_1.NotFoundException('Group Not Found!');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RolesGuard = __decorate([
        common_1.Injectable()
    ], RolesGuard);
    return RolesGuard;
}());
exports.RolesGuard = RolesGuard;
exports.SkipRoleGuard = function () { return common_1.SetMetadata('SkipRoleGuard', true); };
exports.Roles = core_1.Reflector.createDecorator();
