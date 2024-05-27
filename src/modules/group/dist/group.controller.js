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
exports.__esModule = true;
exports.GroupController = void 0;
var common_1 = require("@nestjs/common");
var roles_guard_1 = require("./guards/roles.guard");
var roles_list_1 = require("src/core/constants/roles-list");
var constants_1 = require("src/core/constants");
var GroupController = /** @class */ (function () {
    function GroupController(groupService, rolesUserGroupService) {
        this.groupService = groupService;
        this.rolesUserGroupService = rolesUserGroupService;
    }
    GroupController.prototype.getGroupInfoById = function (req) {
        return this.groupService.findGroupInfoById(req.query.group);
    };
    GroupController.prototype.deleteGroup = function (id, req) {
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);
    };
    GroupController.prototype.createNewGroup = function (body, req) {
        var ownerId = req.user.id;
        var groupInfo = {
            name: body.name,
            is_active: body.isActive,
            is_public: body.isPublic,
            description: body.description,
            creator_id: ownerId
        };
        var group = this.groupService.create(groupInfo);
        // console.log(group)
        //const groupInfo =  await this.groupService.create(body)
        return group;
    };
    GroupController.prototype.updateGroupInfo = function (id, body, req) {
        return true;
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
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMinimunRolesPrivilege(constants_1.ROLE_MODERATOR)),
        common_1.Get(''),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getGroupInfoById");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMinimunRolesPrivilege(constants_1.ROLE_SUPERUSER)),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], GroupController.prototype, "deleteGroup");
    __decorate([
        roles_guard_1.SkipRoleGuard(),
        common_1.Post(''),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "createNewGroup");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMinimunRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Body()), __param(2, common_1.Request())
    ], GroupController.prototype, "updateGroupInfo");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMinimunRolesPrivilege(constants_1.ROLE_USER)),
        common_1.Get('group-code:groupCode'),
        __param(0, common_1.Param('groupCode')), __param(1, common_1.Request())
    ], GroupController.prototype, "getGroupInfoByGroupCode");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMinimunRolesPrivilege(constants_1.ROLE_ADMIN)),
        common_1.Get('group-members'),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getGroupMembersList");
    __decorate([
        roles_guard_1.Roles(roles_list_1.getMinimunRolesPrivilege(constants_1.ROLE_USER)),
        common_1.Get('grouprole'),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getMyGroupRole");
    GroupController = __decorate([
        common_1.Controller('group'),
        common_1.UseGuards(roles_guard_1.RolesGuard)
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
