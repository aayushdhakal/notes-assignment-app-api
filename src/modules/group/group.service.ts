import { Inject,Injectable } from '@nestjs/common';
import { Groups } from 'src/core/db/models/groups.model';
import { GROUPS_REPOSITORY, SEQUELIZE } from "src/core/constants";
import { GroupUpdateDto } from './dto/group.dto';
import { RolesUserGroupService } from '../roles-user-group/roles-user-group.service';

@Injectable()
export class GroupService {
    constructor(
        @Inject(GROUPS_REPOSITORY) private readonly groupRepository:typeof Groups,
        private readonly rolesUserGroupService:RolesUserGroupService
    ){}

    async create(groupInfo){ //:Promise<{Groups,RolesUserGroup}>
        const group = await this.groupRepository.create<Groups>(groupInfo)
        return group;
    }

    async updateGroupInfo(group_id:string,groupData): Promise<[affectedCount: number]>{
        return await this.groupRepository.update<Groups>(
            {...groupData},
            {where:{
                id:group_id
            }}
        );
    }

    async findGroupInfoById(id):Promise<Groups>{
        return await this.groupRepository.findOne<Groups>({where:{id}})
    }

    async findGroupInfoByGroupCode(groupCode:string):Promise<Groups>{
        return await this.groupRepository.findOne<Groups>({where:{group_code:groupCode}})
    }

    async checkGroupPermissions(userMemberId:String,groupId:String){
        // return await this.groupRepository.findOne<GroupTable>({where:{id,groupId}})
        return true;
    }

    async deleteGroup(groupId:string):Promise<Number>{
        return await this.groupRepository.destroy({where:{id:groupId}})
    }

    //---------------------------For User related Methods ------------------------

    async addUserToGroupRoles(groupId:string,userId:string,rolesId:string){
        return await this.rolesUserGroupService.createNewRolesForGroup(groupId,userId,rolesId);
    }

    async removeUserFromGroup(groupId:string,userId){
        return await this.rolesUserGroupService.removeUserFromGroup(groupId,userId);
    }

    async updateUserRolesOfGroup(groupId:string,userId:string,rolesId:string){
        return await this.rolesUserGroupService.updateRolesGroup(groupId,userId,rolesId);
    }

}
