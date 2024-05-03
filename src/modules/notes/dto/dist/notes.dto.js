"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoteUpdateDto = exports.NoteCreateDto = exports.ViewTypeEnum = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ViewTypeEnum;
(function (ViewTypeEnum) {
    ViewTypeEnum["PUBLIC"] = "public";
    ViewTypeEnum["PRIVATE"] = "private";
})(ViewTypeEnum = exports.ViewTypeEnum || (exports.ViewTypeEnum = {}));
var NoteCreateDto = /** @class */ (function () {
    function NoteCreateDto() {
        this.is_active = false;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty()
    ], NoteCreateDto.prototype, "name");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty()
    ], NoteCreateDto.prototype, "description");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsBoolean()
    ], NoteCreateDto.prototype, "is_active");
    __decorate([
        class_transformer_1.Transform(function (_a) {
            var value = _a.value;
            return ("" + value).toLowerCase();
        }),
        class_validator_1.IsEnum(ViewTypeEnum)
    ], NoteCreateDto.prototype, "view_type");
    return NoteCreateDto;
}());
exports.NoteCreateDto = NoteCreateDto;
var NoteUpdateDto = /** @class */ (function () {
    function NoteUpdateDto() {
    }
    return NoteUpdateDto;
}());
exports.NoteUpdateDto = NoteUpdateDto;
