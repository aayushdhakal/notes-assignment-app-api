import { Module } from '@nestjs/common';
import { ROLES_USERS_GROUP_REPOSITORY } from 'src/core/constants';
import { RolesUserGroup } from 'src/core/db/models/rolesUserGroup.model';
import { RolesUserGroupService } from './roles-user-group.service';
import { RolesUserGroupController } from './roles-user-group.controller';

@Module({
    providers:[
        {
            provide:ROLES_USERS_GROUP_REPOSITORY,
            useValue:RolesUserGroup
        },
        RolesUserGroupService,
    ],
    controllers: [RolesUserGroupController],
    exports:[RolesUserGroupService]
})
export class RolesUserGroupModule {}
