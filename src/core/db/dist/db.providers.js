"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.databaseProviders = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var constants_1 = require("../constants");
var db_config_1 = require("./db.config");
var users_model_1 = require("./models/users.model");
var notes_model_1 = require("./models/notes.model");
var groups_model_1 = require("./models/groups.model");
var roles_model_1 = require("./models/roles.model");
var rolesUserGroup_model_1 = require("./models/rolesUserGroup.model");
exports.databaseProviders = [{
        // when other parts of your NestJS application request a dependency using the SEQUELIZE token (e.g., through constructor injection), they will receive the Sequelize instance configured according to the environment variables and database configuration specified in this factory function.
        provide: constants_1.SEQUELIZE,
        // The useFactory property is used to define a factory function that returns the dependency (Sequelize instance in this case). This factory function allows for asynchronous setup, such as connecting to the database using different configurations based on the environment (development, test, production).
        useFactory: function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, sequelize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        switch (process.env.NODE_ENV) {
                            case constants_1.DEVELOPMENT:
                                config = db_config_1.databaseConfig.development;
                                break;
                            case constants_1.TEST:
                                config = db_config_1.databaseConfig.test;
                                break;
                            case constants_1.PRODUCTION:
                                config = db_config_1.databaseConfig.production;
                                break;
                            default:
                                config = db_config_1.databaseConfig.development;
                        }
                        sequelize = new sequelize_typescript_1.Sequelize(config);
                        //adding all the models for the User and Note
                        sequelize.addModels([users_model_1.User, notes_model_1.Note, groups_model_1.Groups, roles_model_1.Roles, rolesUserGroup_model_1.RolesUserGroup]);
                        //await sequelize.sync({alter:true}); //create a table if present and alter table if any changes
                        return [4 /*yield*/, sequelize.sync({ force: true })];
                    case 1:
                        //await sequelize.sync({alter:true}); //create a table if present and alter table if any changes
                        _a.sent(); //this delete all existing tables along with data and create all the tables
                        return [2 /*return*/, sequelize];
                }
            });
        }); }
    }];
