import { Module } from '@nestjs/common';
import { notesProviders } from './notes.providers';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { GroupModule } from '../group/group.module';
import { RolesUserGroupModule } from '../roles-user-group/roles-user-group.module';
import { RolesModule } from '../roles/roles.module';
import { RolesGuard } from '../group/guards/roles.guard';
// import { RolesGuard } from './guards/roles.guard';


@Module({
  providers:[
    NotesService,
    ...notesProviders,
    RolesGuard
  ],
  imports:[
    RolesUserGroupModule,
    RolesModule,
    GroupModule
  ],
  exports:[NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
