import { Module } from '@nestjs/common';
import { notesProviders } from './notes.providers';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';


@Module({
  providers:[NotesService,...notesProviders],
  exports:[NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
