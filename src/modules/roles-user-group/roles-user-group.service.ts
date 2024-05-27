import { Inject, Injectable } from '@nestjs/common';
import { ROLES_USERS_GROUP_REPOSITORY } from 'src/core/constants';
import { Groups } from 'src/core/db/models/groups.model';
import { Roles } from 'src/core/db/models/roles.model';
import { RolesUserGroup } from 'src/core/db/models/rolesUserGroup.model';
import { User } from 'src/core/db/models/users.model';

@Injectable()
export class RolesUserGroupService {
    constructor(
        @Inject(ROLES_USERS_GROUP_REPOSITORY) private readonly usersRolesGroupRepository:typeof RolesUserGroup
    ){}

    async getAllRUGS(){
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>();
    }

    async createNewRolesForGroup(groupId:string,userId:string,rolesId:string):Promise<RolesUserGroup>{
        return await this.usersRolesGroupRepository.create<RolesUserGroup>({
            user_id:userId,
            group_id:groupId,
            roles_id:rolesId
        })
    }

    async updateRolesGroup(groupId:string,userId:string,rolesId:string):Promise<[affectedCount: number]>{
        return await this.usersRolesGroupRepository.update<RolesUserGroup>(
            {roles_id:rolesId},
            {where:{
                user_id:userId,
                group_id:groupId
            }}
        )
    }

    async removeUserFromGroup(groupId:string,userId:string,):Promise<number>{
        return await this.usersRolesGroupRepository.destroy(
            {where:{
                user_id:userId,
                group_id:groupId
            }}
        )
    }

    async getGroupsRolesFromUserId(groupId:string,userId:string):Promise<RolesUserGroup[]>{
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>({
            where:{
                user_id:userId,
                group_id:groupId
            },
            include:[
                {model:Groups,as:'group',attributes:['name']},
                {model:Roles,as:'role',attributes:['name']}
            ]
        })
    }

    async getGroupMembersFromGroupId(groupId:string):Promise<RolesUserGroup[]>{
        return await this.usersRolesGroupRepository.findAll<RolesUserGroup>({
            where:{
                group_id:groupId
            },
            include:[
                {model:Roles,as:'role',attributes:['name']},
                {model:User,as:'user',attributes:['name','id']}
            ]
        })
    }
}
