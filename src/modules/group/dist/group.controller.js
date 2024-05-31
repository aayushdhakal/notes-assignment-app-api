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
    // GROUP MODEL { name. description , isPublic, isActive }
    /*
    route as 'api/v1/group' POST method
    this ia a route which is used to create a new group on the database table
    this will use the model of the group to save the provided data to the database
    */
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
    /*
    route as 'api/v1/group/join-group' POST method
    this ia a route which is used to request to join a group using group id and user id
    this route takes the group_id from the request query and take the user_id from the accessed token parsed from the jwt auth guard and process it to the user
    */
    GroupController.prototype.requestUserToJoinGroup = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var request, roles, rUGS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, req.user.id)];
                    case 1:
                        request = _a.sent();
                        // check if the value is returned greater than 0 then means it has previosuly sent the request or is already part of this group if the user has already sent the request then first block of the code is executed and if the user has the role of any other than ROLE_REQUEST(may be 'admin' ,'user' so on ) then it will run the second block of code 
                        if (request.length > 0 && request[0].dataValues.role.dataValues.name == constants_1.ROLE_REQUEST) {
                            throw new common_1.BadRequestException('You have already requested to join this group.');
                        }
                        else if (request.length > 0 && request[0].dataValues.role.dataValues.name == constants_1.ROLE_BANNED) {
                            throw new common_1.UnauthorizedException('You have beened banned from this group.');
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
    /*
    route as 'api/v1/group/', GET method , can only be accessed by user and above
    this ia a route which is used to get the information about the the group name, description , public type, active type.
    */
    GroupController.prototype.getGroupInfoById = function (req) {
        return this.groupService.findGroupInfoById(req.query.group);
    };
    /*
    route as 'api/v1/group/', DELETE method , can only be accessed by superuser
    this ia a route which is used to delete the group.
    */
    GroupController.prototype.deleteGroup = function (req) {
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);
    };
    /*
    route as 'api/v1/group/', PATCH method , can only be accessed by admin and above
    this ia a route which is used to delete the group.
    */
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
    /*
    route as 'api/v1/group/group-code',Param as :groupCode, GET method , can only be accessed by user and above
    this ia a route which is used to delete the group.
    */
    GroupController.prototype.getGroupInfoByGroupCode = function (groupCode, req) {
        return this.groupService.findGroupInfoByGroupCode(groupCode);
    };
    /*
    route as 'api/v1/group/group-mombers', GET method , can only be accessed by admin and above
    this ia a route which is used to get the list of group members of the given group.
    */
    GroupController.prototype.getGroupMembersList = function (req) {
        return this.rolesUserGroupService.getGroupMembersFromGroupId(req.query.group);
    };
    /*
    route as 'api/v1/group/my-group-role', GET method , can only be accessed by user and above
    this ia a route which is used to get the list of role of group members of the group.
    */
    GroupController.prototype.getMyGroupRole = function (req) {
        return this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, req.user.id);
    };
    /*
    route as 'api/v1/group/add-user-group', POST method , can only be accessed by admin and above
    this ia a route which is used to add a user to the group.
    body:{
        assignRole:'admin',       'admin','user' so on.
        userId:'...'
    }
    */
    GroupController.prototype.addUserToGroup = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var request, roleId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, body.userId)];
                    case 1:
                        request = _a.sent();
                        if (request.length > 0 && request[0].dataValues.role.dataValues.name != constants_1.ROLE_REQUEST) {
                            throw new common_1.BadRequestException('You have already part of this Group');
                        }
                        return [4 /*yield*/, this.rolesService.findRoleIdByName(body.assignRole)];
                    case 2:
                        roleId = _a.sent();
                        return [2 /*return*/, this.rolesUserGroupService.createNewRolesForGroup(req.query.group, req.user.id, roleId.dataValues.id)];
                }
            });
        });
    };
    /*
    route as 'api/v1/group/update-user-group-role', POST method , can only be accessed by admin and above
    this ia a route which is used to update a user of the group.
        body:{
        assignRole:'..',   'admin','user' so on.
        userId:'...'
    }
    */
    GroupController.prototype.updateUserRoleStatus = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var request, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group, body.userId)];
                    case 1:
                        request = _a.sent();
                        if (request.length < 1) {
                            throw new common_1.NotFoundException('User not found in the Group. User need to belong to this group to update the role.');
                        }
                        if (request[0].dataValues.role.name == body.assignRole) {
                            throw new common_1.BadRequestException('User is same as the assigned Role.');
                        }
                        // check if the working user is super user or not and the working can only add the roles as much as he has.For. eg the user which is admin in the working group can only give priviledge till admin roll not upper role.
                        if (req.userGroupInfo.userRole != constants_1.ROLE_SUPERUSER && !(roles_list_1.getMinimumRolesList(req.userGroupInfo.userRole).includes(body.assignRole))) {
                            throw new common_1.BadRequestException("You cannot perform this Action.");
                        }
                        return [4 /*yield*/, this.rolesService.findRoleIdByName(body.assignRole)];
                    case 2:
                        role = _a.sent();
                        return [2 /*return*/, this.rolesUserGroupService.updateRolesGroup(req.query.group, body.userId, role.dataValues.id)];
                }
            });
        });
    };
    /*
    route as 'api/v1/group/update-user-group-role', POST method , can only be accessed by admin and above
    this ia a route which is used to remove (Not Banned) a user to the group.
    body:{
        userId:'...'
    }
    */
    GroupController.prototype.removeMemberFromGroup = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesUserGroupService.removeUserFromGroup(req.query.group, body.userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
    route as 'api/v1/group/banned-user-', POST method , can only be accessed by admin and above
    this ia a route which is used to banned a user of the group.
    body:{
        userId:'...'
    }
    */
    GroupController.prototype.bannedMemberofGroup = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var bannedRoleId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesService.findRoleIdByName(constants_1.ROLE_BANNED)];
                    case 1:
                        bannedRoleId = _a.sent();
                        return [4 /*yield*/, this.rolesUserGroupService.updateRolesGroup(req.query.group, body.userId, bannedRoleId.dataValues.id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
    route as 'api/v1/group/banned-user-', POST method , can only be accessed by admin and above
    this ia a route which is used to banned a user of the group.
    body:{
        userId:'...'
    }
    */
    GroupController.prototype.liftBannedUserofGroup = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var bannedRoleId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rolesService.findRoleIdByName(constants_1.ROLE_USER)];
                    case 1:
                        bannedRoleId = _a.sent();
                        return [4 /*yield*/, this.rolesUserGroupService.updateRolesGroup(req.query.group, body.userId, bannedRoleId.dataValues.id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
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
        common_1.Post('update-user-group-role'),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "updateUserRoleStatus");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Post('remove-user-from-group'),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "removeMemberFromGroup");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Post('banned-user-from-group'),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "bannedMemberofGroup");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Post('lift-banned-from-group'),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "liftBannedUserofGroup");
    GroupController = __decorate([
        common_1.Controller('group'),
        common_1.UseGuards(roles_guard_1.RolesGuard)
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
