"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupDto = void 0;
var class_validator_1 = require("class-validator");
var GroupDto = /** @class */ (function () {
    function GroupDto() {
        this.isActive = false;
        this.isPublic = false;
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], GroupDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsBoolean()
    ], GroupDto.prototype, "isActive");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsBoolean()
    ], GroupDto.prototype, "isPublic");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], GroupDto.prototype, "description");
    return GroupDto;
}());
exports.GroupDto = GroupDto;
