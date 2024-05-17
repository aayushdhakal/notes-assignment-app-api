import { Inject,Injectable } from '@nestjs/common';
import { GroupTable } from 'src/core/db/models/group.model';
import { GROUPTABLE_REPOSITORY } from "src/core/constants";

@Injectable()
export class GroupService {
    constructor(
        @Inject(GROUPTABLE_REPOSITORY) private readonly groupRepository:typeof GroupTable
    ){}

    async create(groupInfo):Promise<GroupTable>{
        return await this.groupRepository.create<GroupTable>(groupInfo)
    }

    async checkGroupPermissions(userMemberId:String,groupId:String){
        // return await this.groupRepository.findOne<GroupTable>({where:{id,groupId}})
        return true;
    }

}
