import { Controller, Get } from '@nestjs/common';
import { RolesUserGroupService } from './roles-user-group.service';
import { SkipAuth } from '../auth/guards/jwt.guard';

@SkipAuth()
@Controller('roles-user-group')
export class RolesUserGroupController {
    constructor(
        private readonly rolesUserGroupService: RolesUserGroupService
    ) {}

    @Get('')
    async getAllRolesUserGroupService(){
        return this.rolesUserGroupService.getAllRUGS();
    }
}
