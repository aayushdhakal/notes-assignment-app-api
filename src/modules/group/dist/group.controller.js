"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.GroupController = void 0;
var common_1 = require("@nestjs/common");
var roles_guard_1 = require("./guards/roles.guard");
var roles_list_1 = require("src/core/constants/roles-list");
var constants_1 = require("src/core/constants");
var GroupController = /** @class */ (function () {
    function GroupController(groupService, rolesUserGroupService, rolesService) {
        this.groupService = groupService;
        this.rolesUserGroupService = rolesUserGroupService;
        this.rolesService = rolesService;
    }
    GroupController.prototype.createNewGroup = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var ownerId, groupInfo, group, roles, createRUGS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ownerId = req.user.id;
                        groupInfo = {
                            name: body.name,
                            is_active: body.isActive,
                            is_public: body.isPublic,
                            description: body.description,
                            creator_id: ownerId
                        };
                        return [4 /*yield*/, this.groupService.create(groupInfo)];
                    case 1:
                        group = _a.sent();
                        return [4 /*yield*/, this.rolesService.findRoleIdByName(constants_1.ROLE_SUPERUSER)];
                    case 2:
                        roles = _a.sent();
                        return [4 /*yield*/, this.rolesUserGroupService.createNewRolesForGroup(group.dataValues.id, ownerId, roles.dataValues.id)];
                    case 3:
                        createRUGS = _a.sent();
                        return [2 /*return*/, { group: group, createRUGS: createRUGS }];
                }
            });
        });
    };
    GroupController.prototype.requestUserToJoinGroup = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var request, roles, rUGS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, req.user.id)];
                    case 1:
                        request = _a.sent();
                        if (request.length > 0 && request[0].dataValues.role.dataValues.name == constants_1.ROLE_REQUEST) {
                            throw new common_1.BadRequestException('You have already requested to join this group.');
                        }
                        else if ((request.length > 0)) {
                            throw new common_1.BadRequestException('You Are the part of this Group.');
                        }
                        return [4 /*yield*/, this.rolesService.findRoleIdByName(constants_1.ROLE_REQUEST)];
                    case 2:
                        roles = _a.sent();
                        return [4 /*yield*/, this.rolesUserGroupService.createNewRolesForGroup(req.query.group, req.user.id, roles.dataValues.id)];
                    case 3:
                        rUGS = _a.sent();
                        return [2 /*return*/, { rUGS: rUGS, message: "Request to Join Group has been Sent." }];
                }
            });
        });
    };
    GroupController.prototype.getGroupInfoById = function (req) {
        return this.groupService.findGroupInfoById(req.query.group);
    };
    GroupController.prototype.deleteGroup = function (req) {
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);
    };
    GroupController.prototype.updateGroupInfo = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var name, description, isPublic, isActive, tempVal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = body.name, description = body.description, isPublic = body.isPublic, isActive = body.isActive;
                        tempVal = {};
                        if (name) {
                            tempVal.name = name;
                        }
                        if (description) {
                            tempVal.description = description;
                        }
                        if (isPublic == true) {
                            tempVal.is_public = true;
                        }
                        else if (isPublic == false) {
                            tempVal.is_public = false;
                        }
                        if (isActive == true) {
                            tempVal.is_active = true;
                        }
                        else if (isActive == false) {
                            tempVal.is_active = false;
                        }
                        return [4 /*yield*/, this.groupService.updateGroupInfo(req.userGroupInfo.group.groupId, tempVal)];
                    case 1: 
                    // console.log()
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GroupController.prototype.getGroupInfoByGroupCode = function (groupCode, req) {
        return this.groupService.findGroupInfoByGroupCode(groupCode);
    };
    GroupController.prototype.getGroupMembersList = function (req) {
        return this.rolesUserGroupService.getGroupMembersFromGroupId(req.query.group);
    };
    GroupController.prototype.getMyGroupRole = function (req) {
        return this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, req.user.id);
    };
    GroupController.prototype.addUserToGroup = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, body.userId)];
                    case 1:
                        request = _a.sent();
                        console.log(request[0].dataValues.role);
                        if (request.length > 0 && request[0].dataValues.role.dataValues.name != constants_1.ROLE_REQUEST) {
                            throw new common_1.BadRequestException('You have already part of this Group');
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    GroupController.prototype.updateUserRoleStatus = function (userId, newUserRole, req) {
        // At first check for the current role of the user in the particular group and then only proceed with that logic 
        // check for the condition that if the permission giving user is of admin he/she can only assign new role till admin priviledge only not super user
        // then use the logic to assign the role or remove the role to the user properly
        return true;
    };
    GroupController.prototype.removeMemberFromGroup = function (userId, groupId) {
        return true;
    };
    __decorate([
        roles_guard_1.SkipRoleGuard(),
        common_1.Post(''),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "createNewGroup");
    __decorate([
        roles_guard_1.SkipRoleGuard(),
        common_1.Post('join-group'),
        __param(0, common_1.Request())
    ], GroupController.prototype, "requestUserToJoinGroup");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        common_1.Get(''),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getGroupInfoById");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_SUPERUSER)),
        common_1.Delete(''),
        __param(0, common_1.Request())
    ], GroupController.prototype, "deleteGroup");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Patch(''),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "updateGroupInfo");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        common_1.Get('group-code/:groupCode'),
        __param(0, common_1.Param('groupCode')), __param(1, common_1.Request())
    ], GroupController.prototype, "getGroupInfoByGroupCode");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Get('group-members'),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getGroupMembersList");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        common_1.Get('my-group-role'),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getMyGroupRole");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Post('add-user-group'),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "addUserToGroup");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        __param(2, common_1.Request())
    ], GroupController.prototype, "updateUserRoleStatus");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN))
    ], GroupController.prototype, "removeMemberFromGroup");
    GroupController = __decorate([
        common_1.Controller('group'),
        common_1.UseGuards(roles_guard_1.RolesGuard)
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
