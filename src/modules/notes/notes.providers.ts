import { NOTE_REPOSITORY } from "src/core/constants";
import { Note } from "src/core/db/models/notes.model";


export const notesProviders = [{
    provide:NOTE_REPOSITORY,
    useValue:Note
}]