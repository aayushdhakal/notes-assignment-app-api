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
exports.RemovingUserFromGroupDto = exports.LiftUserBannedFromGroup = exports.BannedUserMemberDto = exports.UpdateUserRoleStatusDto = exports.AddingUserGroupDto = exports.UserIdOnlyDto = exports.UserIdAndGroupIdDto = exports.GroupUpdateDto = exports.GroupCreateDto = void 0;
var class_validator_1 = require("class-validator");
var constants_1 = require("src/core/constants");
var GroupCreateDto = /** @class */ (function () {
    function GroupCreateDto() {
        this.isActive = false;
        this.isPublic = false;
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], GroupCreateDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsBoolean()
    ], GroupCreateDto.prototype, "isActive");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsBoolean()
    ], GroupCreateDto.prototype, "isPublic");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], GroupCreateDto.prototype, "description");
    return GroupCreateDto;
}());
exports.GroupCreateDto = GroupCreateDto;
var GroupUpdateDto = /** @class */ (function () {
    function GroupUpdateDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], GroupUpdateDto.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], GroupUpdateDto.prototype, "isActive");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], GroupUpdateDto.prototype, "isPublic");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], GroupUpdateDto.prototype, "description");
    return GroupUpdateDto;
}());
exports.GroupUpdateDto = GroupUpdateDto;
var RolesListEnum;
(function (RolesListEnum) {
    RolesListEnum[RolesListEnum["SUPERUSER"] = constants_1.ROLE_SUPERUSER] = "SUPERUSER";
    RolesListEnum[RolesListEnum["ADMIN"] = constants_1.ROLE_ADMIN] = "ADMIN";
    RolesListEnum[RolesListEnum["MODERATOR"] = constants_1.ROLE_MODERATOR] = "MODERATOR";
    RolesListEnum[RolesListEnum["CONTRIBUTOR"] = constants_1.ROLE_CONTRIBUTOR] = "CONTRIBUTOR";
    RolesListEnum[RolesListEnum["USER"] = constants_1.ROLE_USER] = "USER";
    RolesListEnum[RolesListEnum["GUEST"] = constants_1.ROLE_GUEST] = "GUEST";
    RolesListEnum[RolesListEnum["REQUEST"] = constants_1.ROLE_REQUEST] = "REQUEST";
    RolesListEnum[RolesListEnum["BANNED"] = constants_1.ROLE_BANNED] = "BANNED";
    RolesListEnum[RolesListEnum["INVITATION"] = constants_1.ROLE_INVITATION] = "INVITATION";
})(RolesListEnum || (RolesListEnum = {}));
var UserIdAndGroupIdDto = /** @class */ (function () {
    function UserIdAndGroupIdDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsUUID(constants_1.UUIDVERSION)
    ], UserIdAndGroupIdDto.prototype, "userId");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.IsEnum(RolesListEnum)
    ], UserIdAndGroupIdDto.prototype, "assignRole");
    return UserIdAndGroupIdDto;
}());
exports.UserIdAndGroupIdDto = UserIdAndGroupIdDto;
var UserIdOnlyDto = /** @class */ (function () {
    function UserIdOnlyDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsUUID(constants_1.UUIDVERSION)
    ], UserIdOnlyDto.prototype, "userId");
    return UserIdOnlyDto;
}());
exports.UserIdOnlyDto = UserIdOnlyDto;
var AddingUserGroupDto = /** @class */ (function (_super) {
    __extends(AddingUserGroupDto, _super);
    function AddingUserGroupDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddingUserGroupDto;
}(UserIdAndGroupIdDto));
exports.AddingUserGroupDto = AddingUserGroupDto;
var UpdateUserRoleStatusDto = /** @class */ (function (_super) {
    __extends(UpdateUserRoleStatusDto, _super);
    function UpdateUserRoleStatusDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateUserRoleStatusDto;
}(AddingUserGroupDto));
exports.UpdateUserRoleStatusDto = UpdateUserRoleStatusDto;
var BannedUserMemberDto = /** @class */ (function (_super) {
    __extends(BannedUserMemberDto, _super);
    function BannedUserMemberDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BannedUserMemberDto;
}(UserIdOnlyDto));
exports.BannedUserMemberDto = BannedUserMemberDto;
var LiftUserBannedFromGroup = /** @class */ (function (_super) {
    __extends(LiftUserBannedFromGroup, _super);
    function LiftUserBannedFromGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LiftUserBannedFromGroup;
}(UserIdOnlyDto));
exports.LiftUserBannedFromGroup = LiftUserBannedFromGroup;
var RemovingUserFromGroupDto = /** @class */ (function (_super) {
    __extends(RemovingUserFromGroupDto, _super);
    function RemovingUserFromGroupDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RemovingUserFromGroupDto;
}(UserIdOnlyDto));
exports.RemovingUserFromGroupDto = RemovingUserFromGroupDto;
