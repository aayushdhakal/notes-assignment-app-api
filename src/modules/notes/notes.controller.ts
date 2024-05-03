import { Body, Controller,Get, Post ,Request,Query, Param, ParseUUIDPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteCreateDto } from './dto/notes.dto';
import { SkipAuth } from '../auth/guards/jwt.guard';

@Controller('notes')
export class NotesController {
    constructor(
        private readonly notesService: NotesService,
    ){}

    // this is a notes list we send when the particular notes is available to the public
    @Get('public-notes')
    @SkipAuth()
    async getNotesForPublic(@Query('page') page?:number,@Query('offset') offset?:number){

        //this is the page number and offset working now need to implement this page and offset
        console.log(page,offset);
        const notes = this.notesService.findAllPublicNotes();
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

}
