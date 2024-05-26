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

    async createNewRolesGroup(user_id:string,group_id:string,roles_id:string):Promise<RolesUserGroup>{
        return await this.usersRolesGroupRepository.create<RolesUserGroup>({
            user_id,
            group_id,
            roles_id
        })
    }

    async updateRolesGroup(user_id:string,group_id:string,roles_id:string):Promise<[affectedCount: number]>{
        return await this.usersRolesGroupRepository.update<RolesUserGroup>(
            {roles_id},
            {where:{
                user_id,
                group_id
            }}
        )
    }

    async removeUserFromGroup(user_id:string,group_id:string):Promise<number>{
        return await this.usersRolesGroupRepository.destroy(
            {where:{
                user_id,
                group_id
            }}
        )
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

    async getGroupMembersFromGroupId(group_id:string):Promise<RolesUserGroup[]>{
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>({
            where:{
                group_id
            },
            include:[
                {model:Roles,as:'role',attributes:['name']}
            ]
        })
    }
}
