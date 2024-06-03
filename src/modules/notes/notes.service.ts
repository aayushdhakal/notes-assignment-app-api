import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NOTE_REPOSITORY } from "src/core/constants";
import { Note } from "src/core/db/models/notes.model";
import { NoteCreateDto ,NoteUpdateDto } from "./dto/notes.dto";
import { User } from "../../core/db/models/users.model";
import { log } from "console";

const Sequelize = require('sequelize')



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

    async updateNote(groupId:string,noteId:string,updateInfo:NoteUpdateDto,userId:string):Promise<Note>{

        const note = await this.findOneByNoteId(noteId,userId);
        if(!note){
            throw new NotFoundException('Note not found.');
        }

        await note.update({...updateInfo});
        const newNote = await note.save();

        return  newNote || null;
    }

    async deleteNote(noteId:string,userId:string):Promise<Boolean>{
        let note = await this.findOneByNoteId(noteId);
        await note.destroy();
        return true;
    }

    async listNotesWithUserId(userId:string):Promise<Array<Note>>{
        
        const {count, rows} = await this.noteRepository.findAndCountAll({
            where:{
                user_id:userId,
            },
            offset:10,
            limit:2,
        })

        return rows
    }

    async findAllthePersonelNotes(userId:string):Promise<Array<Note>>{
        return await this.noteRepository.findAll({where:{user_id:userId}});
    }

    // -----------------this is collection of the public api --------------------------

    //this is a data available to the public where the view_type:'public'
    async findAllPublicNotes({limit,offset}):Promise<Note[]>{
        return await this.noteRepository.findAll<Note>({
            where:{view_type:'public',is_active:true},
            offset,
            limit,
            include:[
                { model:User, as:'owner', attributes:['username'] } 
            ]
        });
    }

    //this is a data/inforamtion available to the public 
    async findOneByNoteId(groupId:string,noteId:string,userId?:string):Promise<Note>{
        
        return await this.noteRepository.findOne({
        where:{
                group_id:groupId,
                id:noteId,
                ...(!userId && {view_type:'public'}),
                is_active:true,
                ...(userId && {user_id:userId})
            },
            include:[{model:User,as:'user',attributes:['id','username']}]
        });
    }

    async findNoteUsingGroup(groupId:string):Promise<Note[]>{
        return this.noteRepository.findAll({
            where:{group_id:groupId}
        })
    }
    
}