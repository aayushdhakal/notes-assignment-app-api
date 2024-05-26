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
var GroupController = /** @class */ (function () {
    function GroupController(groupService, rolesUserGroupService) {
        this.groupService = groupService;
        this.rolesUserGroupService = rolesUserGroupService;
    }
    GroupController.prototype.getGroupInfoById = function (req) {
        return this.groupService.findGroupInfoById(req.query.group);
    };
    GroupController.prototype.deleteGroup = function (id, req) {
        this.groupService.deleteGroup(req.userGroupInfo.group.groupId);
        return true;
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
        return true;
    };
    GroupController.prototype.getGroupMembersList = function (req) {
        console.log(req.query.group + ' group code');
        return this.rolesUserGroupService.getGroupMembersFromGroupId(req.query.group);
    };
    __decorate([
        roles_guard_1.Roles(['superuser', 'admin', 'moderator', 'user']),
        common_1.Get(''),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getGroupInfoById");
    __decorate([
        roles_guard_1.Roles(['superuser']),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], GroupController.prototype, "deleteGroup");
    __decorate([
        roles_guard_1.SkipRoleGuard(),
        common_1.Post(''),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "createNewGroup");
    __decorate([
        roles_guard_1.Roles(['superuser', 'admin']),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Body()), __param(2, common_1.Request())
    ], GroupController.prototype, "updateGroupInfo");
    __decorate([
        roles_guard_1.Roles(['superuser', 'admin', 'moderator', 'user']),
        common_1.Get('group-code:groupCode'),
        __param(0, common_1.Param('groupCode')), __param(1, common_1.Request())
    ], GroupController.prototype, "getGroupInfoByGroupCode");
    __decorate([
        roles_guard_1.Roles(['superuser', 'admin']),
        common_1.Get('group-members'),
        __param(0, common_1.Request())
    ], GroupController.prototype, "getGroupMembersList");
    GroupController = __decorate([
        common_1.Controller('group'),
        common_1.UseGuards(roles_guard_1.RolesGuard)
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
