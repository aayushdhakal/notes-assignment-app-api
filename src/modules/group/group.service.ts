import { Inject,Injectable } from '@nestjs/common';
import { Groups } from 'src/core/db/models/groups.model';
import { GROUPS_REPOSITORY } from "src/core/constants";

@Injectable()
export class GroupService {
    constructor(
        @Inject(GROUPS_REPOSITORY) private readonly groupRepository:typeof Groups
    ){}

    async create(groupInfo):Promise<Groups>{
        return await this.groupRepository.create<Groups>(groupInfo)
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
