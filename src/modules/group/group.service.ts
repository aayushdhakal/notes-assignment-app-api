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
        // create a new rolesUserGroup with the user_id,group_id(group.dataValues.id),roles_id with the super user
        return group;
    }

    async updateGroupInfo(groupData:GroupUpdateDto,group_id:string){
        await this.groupRepository.update<Groups>(
            {...groupData},
            {where:{
                id:group_id
            }}
        );
    }

    async findGroupInfoById(id):Promise<Groups>{
        return await this.groupRepository.findOne<Groups>({where:{id}})
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
