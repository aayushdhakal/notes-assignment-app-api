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
exports.User = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var notes_model_1 = require("./notes.model");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            primaryKey: true,
            defaultValue: sequelize_typescript_1.DataType.UUIDV1,
            allowNull: false
        })
    ], User.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], User.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            unique: true,
            allowNull: false
        })
    ], User.prototype, "username");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], User.prototype, "password");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            unique: true,
            allowNull: false
        })
    ], User.prototype, "email");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: true
        })
    ], User.prototype, "phoneNumber");
    __decorate([
        sequelize_typescript_1.HasMany(function () { return notes_model_1.Note; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ], User.prototype, "notes");
    User = __decorate([
        sequelize_typescript_1.Table({ tableName: 'User' })
    ], User);
    return User;
}(sequelize_typescript_1.Model));
exports.User = User;
