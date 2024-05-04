import { Body, Controller,Get, Post ,Request,Query, Param, ParseUUIDPipe, Req, Patch } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteCreateDto, NoteUpdateDto, ViewTypeEnum } from './dto/notes.dto';
import { SkipAuth } from '../auth/guards/jwt.guard';

@Controller('notes')
export class NotesController {
    constructor(
        private readonly notesService: NotesService,
    ){}

    // this is a notes list we send when the particular notes is available to the public
    @Get('public-notes')
    @SkipAuth()
    async getNotesForPublic(@Query('page') page:number = 1,@Query('notesCount') notesCount:number = 9){
        //check for the page and the count the number of the notes
        // offset is the amoun to be skipped
        // page = 1 notesCount=10(this is the amount of the notes to be shown)
        // page = 2 notesCount=10 offset=((notesCount*page)-notesCount) ((10*2)-10)
        // page = 5 notesCount=10 offset =((notesCount*page)-notesCount) ((10*5)-10)

        //this is the page number and offset working now need to implement this page and offset
        //limit is the total count of notes in page offset
        const limitsAndPagination = {
            limit:notesCount,
            offset:((notesCount*page)-notesCount)
        }
        const notes = this.notesService.findAllPublicNotes(limitsAndPagination);
        return notes;
    }


    @Get('user-notes')
    async getNotesForUser(@Request() req){
        const notes = this.notesService.findAllthePersonelNotes(req.user.id);
        return notes;
    }

    //this is a single note available to the public or anyone
    @Get(':id')
    @SkipAuth()
    async getNote(@Param('id',ParseUUIDPipe) id:string,){
        const notes = this.notesService.findOneByNoteId(id);
        return notes; 
    }

    @Post('')
    async createNote(@Body() note:NoteCreateDto,@Request() req){
        return await this.notesService.create({...note,owner_id:req.user.id });
    }

    @Patch(':id')
    async updateNote(@Param('id',ParseUUIDPipe) id:string ,@Body() note:NoteUpdateDto,@Request() req){

        const {name,description,viewType,isActive} = note;
        const tempVal:{
            name?: string,
            description?: string,
            viewType?: ViewTypeEnum,
            isActive?: boolean 
        }= {};

        if(name){tempVal.name=name}
        if(description){tempVal.description=description}
        if(viewType){tempVal.viewType=viewType}
        if(isActive){tempVal.isActive=isActive} 

        return await this.notesService.updateNote(id,tempVal);
    }

}
