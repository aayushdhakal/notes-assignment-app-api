import { Controller, Get, ParseUUIDPipe } from '@nestjs/common';
import { RolesUserGroupService } from './roles-user-group.service';
import { SkipAuth } from '../auth/guards/jwt.guard';

// Just for testing and development of the project @SkipAuth()
@SkipAuth()
@Controller('roles-user-group')
export class RolesUserGroupController {
    constructor(
        private readonly rolesUserGroupService: RolesUserGroupService
    ) {}

    // @Get('')
    // async getAllRolesUserGroupService(){
    //     return this.rolesUserGroupService.getAllRUGS();
    // }

    // @Get('get-roles')
    // async getAllTheGroupsUsersAssociatedWith(userId:string){
    //     // return this.rolesUserGroupService.getGroupsRolesFromUserId(userId);
    // }
}
