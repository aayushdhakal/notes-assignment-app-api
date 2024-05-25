import { Inject,Injectable } from '@nestjs/common';
import { Groups } from 'src/core/db/models/groups.model';
import { GROUPS_REPOSITORY, SEQUELIZE } from "src/core/constants";
import { RolesUserGroup } from 'src/core/db/models/rolesUserGroup.model';


@Injectable()
export class GroupService {
    constructor(
        @Inject(GROUPS_REPOSITORY) private readonly groupRepository:typeof Groups
    ){}

    async create(groupInfo){ //:Promise<{Groups,RolesUserGroup}>
        
        const group = await this.groupRepository.create<Groups>(groupInfo)
        // create a new rolesUserGroup with the user_id,group_id(group.dataValues.id),roles_id with the super user
        return group;
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

}
