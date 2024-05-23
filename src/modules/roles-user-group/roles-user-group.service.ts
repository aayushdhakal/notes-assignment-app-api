import { Inject, Injectable } from '@nestjs/common';
import { ROLES_USERS_GROUP_REPOSITORY } from 'src/core/constants';
import { Groups } from 'src/core/db/models/groups.model';
import { Roles } from 'src/core/db/models/roles.model';
import { RolesUserGroup } from 'src/core/db/models/rolesUserGroup.model';

@Injectable()
export class RolesUserGroupService {
    constructor(
        @Inject(ROLES_USERS_GROUP_REPOSITORY) private readonly usersRolesGroupRepository:typeof RolesUserGroup
    ){}

    async getAllRUGS(){
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>();
    }

    async getGroupsRolesFromUserId(user_id:string,group_id:string):Promise<RolesUserGroup[]>{
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>({
            where:{
                user_id,
                group_id
            },
            include:[
                {model:Groups,as:'group',attributes:['name']},
                {model:Roles,as:'role',attributes:['name']}
            ]
        })
    }
}
