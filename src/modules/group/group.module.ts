import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { groupTableProviders } from './group.providers'
import { RolesGuard } from './guards/roles.guard';
import { RolesModule } from '../roles/roles.module';
import { RolesUserGroupModule } from '../roles-user-group/roles-user-group.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [ GroupService, 
    ...groupTableProviders,
    RolesGuard
  ],
  controllers: [GroupController], 
  exports:[GroupService,RolesGuard],
  imports:[
    RolesModule,
    RolesUserGroupModule
  ]
})
export class GroupModule {}
