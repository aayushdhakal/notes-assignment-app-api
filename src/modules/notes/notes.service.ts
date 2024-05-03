import { Inject, Injectable } from "@nestjs/common";
import { NOTE_REPOSITORY } from "src/core/constants";
import { Note } from "src/core/db/models/notes.model";
import { NoteCreateDto ,NoteUpdateDto } from "./dto/notes.dto";



@Injectable()
export class NotesService{
    constructor(
        @Inject(NOTE_REPOSITORY) private readonly noteRepository:typeof Note
    ){}

    async create(note):Promise<Note>{
        return await this.noteRepository.create<Note>(note)
    }

    async findOneByNotesCode(notesCode:string):Promise<Note>{
        return await this.noteRepository.findOne({where:{note_code:notesCode}});
    }

    async updateNote(noteId,{name,description,is_active}:NoteUpdateDto):Promise<Note>{

        const note = await this.findOneByNoteId(noteId);
        if(!note){
            return null;
        }

        note.update({name,description,is_active});

        return  note || null;
    }

    async deleteNote(noteId:string):Promise<Boolean>{
        let note = await this.findOneByNoteId(noteId);
        await note.destroy();
        return true;
    }

    async listNotesWithUserId(userId:string):Promise<Array<Note>>{
        
        const {count, rows} = await this.noteRepository.findAndCountAll({
            where:{
                owner_id:userId,
            },
            offset:10,
            limit:2,
        })

        return rows
    }

    async findAllthePersonelNotes(userId:string):Promise<Array<Note>>{
        return await this.noteRepository.findAll({where:{owner_id:userId}});
    }

    // -----------------this is collection of the public api --------------------------

    //this is a data available to the public where the view_type:'public'
    async findAllPublicNotes():Promise<Note[]>{
        return await this.noteRepository.findAll<Note>({where:{view_type:'public',is_active:true}});
    }

    //this is a data/inforamtion available to the public 
    async findOneByNoteId(noteId:string):Promise<Note>{
        return await this.noteRepository.findOne({where:{id:noteId,view_type:'public',is_active:true}});
    }
    

}