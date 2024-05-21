import { Inject, Injectable } from '@nestjs/common';
import { ROLES_USERS_GROUP_REPOSITORY } from 'src/core/constants';
import { RolesUserGroup } from 'src/core/db/models/rolesUserGroup.model';

@Injectable()
export class RolesUserGroupService {
    constructor(
        @Inject(ROLES_USERS_GROUP_REPOSITORY) private readonly usersRolesGroupRepository:typeof RolesUserGroup
    ){}

    async getAllRUGS(){
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>();
    }
}
