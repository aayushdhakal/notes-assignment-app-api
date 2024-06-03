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
exports.NotesService = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("src/core/constants");
var users_model_1 = require("../../core/db/models/users.model");
var Sequelize = require('sequelize');
var NotesService = /** @class */ (function () {
    function NotesService(noteRepository) {
        this.noteRepository = noteRepository;
    }
    NotesService.prototype.create = function (note) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noteRepository.create(note)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesService.prototype.findOneByNotesCode = function (notesCode) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noteRepository.findOne({ where: { note_code: notesCode } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesService.prototype.updateNote = function (groupId, noteId, updateInfo, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var note, newNote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOneByNoteId(noteId, userId)];
                    case 1:
                        note = _a.sent();
                        if (!note) {
                            throw new common_1.NotFoundException('Note not found.');
                        }
                        return [4 /*yield*/, note.update(__assign({}, updateInfo))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, note.save()];
                    case 3:
                        newNote = _a.sent();
                        return [2 /*return*/, newNote || null];
                }
            });
        });
    };
    NotesService.prototype.deleteNote = function (noteId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOneByNoteId(noteId)];
                    case 1:
                        note = _a.sent();
                        return [4 /*yield*/, note.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    NotesService.prototype.listNotesWithUserId = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, count, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.noteRepository.findAndCountAll({
                            where: {
                                user_id: userId
                            },
                            offset: 10,
                            limit: 2
                        })];
                    case 1:
                        _a = _b.sent(), count = _a.count, rows = _a.rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NotesService.prototype.findAllthePersonelNotes = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noteRepository.findAll({ where: { user_id: userId } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // -----------------this is collection of the public api --------------------------
    //this is a data available to the public where the view_type:'public'
    NotesService.prototype.findAllPublicNotes = function (_a) {
        var limit = _a.limit, offset = _a.offset;
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.noteRepository.findAll({
                            where: { view_type: 'public', is_active: true },
                            offset: offset,
                            limit: limit,
                            include: [
                                { model: users_model_1.User, as: 'owner', attributes: ['username'] }
                            ]
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    //this is a data/inforamtion available to the public 
    NotesService.prototype.findOneByNoteId = function (groupId, noteId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noteRepository.findOne({
                            where: __assign(__assign(__assign({ group_id: groupId, id: noteId }, (!userId && { view_type: 'public' })), { is_active: true }), (userId && { user_id: userId })),
                            include: [{ model: users_model_1.User, as: 'user', attributes: ['id', 'username'] }]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesService.prototype.findNoteUsingGroup = function (groupId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.noteRepository.findAll({
                        where: { group_id: groupId }
                    })];
            });
        });
    };
    NotesService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(constants_1.NOTE_REPOSITORY))
    ], NotesService);
    return NotesService;
}());
exports.NotesService = NotesService;
