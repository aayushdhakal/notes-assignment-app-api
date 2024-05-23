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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.GroupController = void 0;
var common_1 = require("@nestjs/common");
var roles_guard_1 = require("./guards/roles.guard");
var GroupController = /** @class */ (function () {
    function GroupController(groupService) {
        this.groupService = groupService;
    }
    GroupController.prototype.createNewGroup = function (body, req) {
        var ownerId = req.user.id;
        var groupInfo = __assign(__assign({}, body), { owner_id: ownerId });
        console.log(groupInfo);
        //const groupInfo =  await this.groupService.create(body)
        return true;
    };
    GroupController.prototype.updateGroupInformation = function (id, body, req) {
        return true;
    };
    GroupController.prototype.deleteGroup = function (id, req) {
        return true;
    };
    GroupController.prototype.getGroupInfoById = function (id, req) {
        return true;
    };
    GroupController.prototype.getGroupInfoByGroupCode = function (groupCode, req) {
        return true;
    };
    __decorate([
        roles_guard_1.SkipRoleGuard(),
        common_1.Post(''),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], GroupController.prototype, "createNewGroup");
    __decorate([
        common_1.Patch(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Body()), __param(2, common_1.Request())
    ], GroupController.prototype, "updateGroupInformation");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], GroupController.prototype, "deleteGroup");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], GroupController.prototype, "getGroupInfoById");
    __decorate([
        common_1.Get(':groupCode'),
        __param(0, common_1.Param('groupCode')), __param(1, common_1.Request())
    ], GroupController.prototype, "getGroupInfoByGroupCode");
    GroupController = __decorate([
        common_1.Controller('group'),
        common_1.UseGuards(roles_guard_1.RolesGuard)
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
