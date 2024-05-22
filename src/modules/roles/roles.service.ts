import { Inject, Injectable } from '@nestjs/common';
import { ROLES_REPOSITORY } from 'src/core/constants';
import { Roles } from 'src/core/db/models/roles.model';

@Injectable()
export class RolesService {
    constructor(
        @Inject(ROLES_REPOSITORY) private readonly rolesRepository:typeof Roles
    ){}

    async getAllRoles(){
        return await this.rolesRepository.findAll<Roles>()
    }
}