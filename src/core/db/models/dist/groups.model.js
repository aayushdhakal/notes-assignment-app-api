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
exports.Groups = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var users_model_1 = require("./users.model");
var Groups = /** @class */ (function (_super) {
    __extends(Groups, _super);
    function Groups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            primaryKey: true,
            defaultValue: sequelize_typescript_1.DataType.UUIDV1,
            allowNull: false
        })
    ], Groups.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
            unique: true
        })
    ], Groups.prototype, "name");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return users_model_1.User; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
            unique: false
        })
    ], Groups.prototype, "creator_id");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true
        })
    ], Groups.prototype, "is_active");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true
        })
    ], Groups.prototype, "is_public");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: true
        })
    ], Groups.prototype, "description");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: true
        })
    ], Groups.prototype, "group_code");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return users_model_1.User; })
    ], Groups.prototype, "creator");
    Groups = __decorate([
        sequelize_typescript_1.Table({ tableName: 'groups' })
    ], Groups);
    return Groups;
}(sequelize_typescript_1.Model));
exports.Groups = Groups;
