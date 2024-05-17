import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { groupTableProviders } from './group.providers'
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [ GroupService, 
    ...groupTableProviders,
    RolesGuard
  ],
  controllers: [GroupController],
  exports:[GroupService]
})
export class GroupModule {}
