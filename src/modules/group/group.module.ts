import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { groupTableProviders } from './group.providers'
import { RolesGuard } from './guards/roles.guard';
import { RolesModule } from '../roles/roles.module';
import { RolesUserGroupModule } from '../roles-user-group/roles-user-group.module';

@Module({
  providers: [ GroupService, 
    ...groupTableProviders,
    RolesGuard
  ],
  controllers: [GroupController],
  exports:[GroupService],
  imports:[RolesModule,RolesUserGroupModule]
})
export class GroupModule {}
