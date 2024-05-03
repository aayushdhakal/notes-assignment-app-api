"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PasswordChangeDto = exports.UserUpdateDTO = exports.UserCreateDto = void 0;
var class_validator_1 = require("class-validator");
var UserCreateDto = /** @class */ (function () {
    function UserCreateDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], UserCreateDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.IsEmail()
    ], UserCreateDto.prototype, "email");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], UserCreateDto.prototype, "username");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.Length(10, 10)
    ], UserCreateDto.prototype, "phoneNumber");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(8, {
            message: "Password must be at least 8 characters long"
        })
    ], UserCreateDto.prototype, "password");
    return UserCreateDto;
}());
exports.UserCreateDto = UserCreateDto;
var UserUpdateDTO = /** @class */ (function () {
    function UserUpdateDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UserUpdateDTO.prototype, "name");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEmail(),
        class_validator_1.IsOptional()
    ], UserUpdateDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UserUpdateDTO.prototype, "username");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.Length(10, 10),
        class_validator_1.IsOptional()
    ], UserUpdateDTO.prototype, "phoneNumber");
    return UserUpdateDTO;
}());
exports.UserUpdateDTO = UserUpdateDTO;
var PasswordChangeDto = /** @class */ (function () {
    function PasswordChangeDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(8, {
            message: "Password must be at least 8 characters long"
        })
    ], PasswordChangeDto.prototype, "newPassword");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(8, {
            message: "Password must be at least 8 characters long"
        })
    ], PasswordChangeDto.prototype, "oldPassword");
    return PasswordChangeDto;
}());
exports.PasswordChangeDto = PasswordChangeDto;
