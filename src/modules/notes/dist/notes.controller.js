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
exports.NotesController = void 0;
var common_1 = require("@nestjs/common");
var roles_guard_1 = require("../group/guards/roles.guard");
var roles_list_1 = require("src/core/constants/roles-list");
var constants_1 = require("src/core/constants");
var NotesController = /** @class */ (function () {
    function NotesController(notesService) {
        this.notesService = notesService;
    }
    // this is a notes list we send when the particular notes is available to the public
    NotesController.prototype.getNotesForPublic = function (page, notesCount) {
        if (page === void 0) { page = 1; }
        if (notesCount === void 0) { notesCount = 9; }
        return __awaiter(this, void 0, void 0, function () {
            var limitsAndPagination, notes;
            return __generator(this, function (_a) {
                limitsAndPagination = {
                    limit: notesCount,
                    offset: ((notesCount * page) - notesCount)
                };
                notes = this.notesService.findAllPublicNotes(limitsAndPagination);
                return [2 /*return*/, notes];
            });
        });
    };
    NotesController.prototype.getNotesofUsers = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var notes;
            return __generator(this, function (_a) {
                notes = this.notesService.findAllthePersonelNotes(req.user.id);
                return [2 /*return*/, notes];
            });
        });
    };
    //this is a single note available to the public or anyone
    NotesController.prototype.getNote = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var notes;
            return __generator(this, function (_a) {
                notes = this.notesService.findOneByNoteId(req.query.group, id);
                return [2 /*return*/, notes];
            });
        });
    };
    NotesController.prototype.createNote = function (note, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notesService.create(__assign(__assign({}, note), { user_id: req.user.id, group_id: req.userGroupInfo.group.groupId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesController.prototype.updateNote = function (id, note, req) {
        return __awaiter(this, void 0, void 0, function () {
            var name, description, viewType, isActive, tempVal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = note.name, description = note.description, viewType = note.viewType, isActive = note.isActive;
                        tempVal = {};
                        if (name) {
                            tempVal.name = name;
                        }
                        if (description) {
                            tempVal.description = description;
                        }
                        if (viewType) {
                            tempVal.view_type = viewType;
                        }
                        if (isActive) {
                            tempVal.is_active = isActive;
                        }
                        return [4 /*yield*/, this.notesService.updateNote(req.query.group, id, tempVal, req.user.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesController.prototype.deleteNote = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notesService.deleteNote(req.query.group, id, req.user.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.Get('public-notes'),
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        __param(0, common_1.Query('page')), __param(1, common_1.Query('notesCount'))
    ], NotesController.prototype, "getNotesForPublic");
    __decorate([
        common_1.Get('user-notes'),
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        __param(0, common_1.Request())
    ], NotesController.prototype, "getNotesofUsers");
    __decorate([
        common_1.Get(':id'),
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], NotesController.prototype, "getNote");
    __decorate([
        common_1.Post(''),
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_USER)),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], NotesController.prototype, "createNote");
    __decorate([
        common_1.Patch(':id'),
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Body()), __param(2, common_1.Request())
    ], NotesController.prototype, "updateNote");
    __decorate([
        common_1.Delete(':id'),
        roles_guard_1.Roles(roles_list_1.getMaximumRolesPrivilege(constants_1.ROLE_ADMIN)),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], NotesController.prototype, "deleteNote");
    NotesController = __decorate([
        common_1.Controller('notes'),
        common_1.UseGuards(roles_guard_1.RolesGuard)
    ], NotesController);
    return NotesController;
}());
exports.NotesController = NotesController;
