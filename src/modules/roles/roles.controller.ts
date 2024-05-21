import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SkipAuth } from '../auth/guards/jwt.guard';

@SkipAuth()
@Controller('roles')
export class RolesController {
    constructor(
        public readonly rolesRepository:RolesService
    ){}

    @Get('')
    async getRoles() {
        return await this.rolesRepository.getAllRoles();
    }
}
