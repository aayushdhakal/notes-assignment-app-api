"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddingUserGroupDto = exports.GroupUpdateDto = exports.GroupCreateDto = void 0;
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
var AddingUserGroupDto = /** @class */ (function () {
    function AddingUserGroupDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsUUID(constants_1.UUIDVERSION)
    ], AddingUserGroupDto.prototype, "userId");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], AddingUserGroupDto.prototype, "assignRole");
    return AddingUserGroupDto;
}());
exports.AddingUserGroupDto = AddingUserGroupDto;
