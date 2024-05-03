"use strict";
exports.__esModule = true;
exports.notesProviders = void 0;
var constants_1 = require("src/core/constants");
var notes_model_1 = require("src/core/db/models/notes.model");
exports.notesProviders = [{
        provide: constants_1.NOTE_REPOSITORY,
        useValue: notes_model_1.Note
    }];
