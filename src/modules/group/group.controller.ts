import { Body, Controller, Get, Post, UseGuards, Request, Param, ParseUUIDPipe, Patch, Delete } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto } from './dto/group.dto';
import { Roles, RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';
import { RolesUserGroupService } from '../roles-user-group/roles-user-group.service';
import { getMaximumRolesPrivilege } from 'src/core/constants/roles-list';
import { ROLE_ADMIN, ROLE_MODERATOR, ROLE_SUPERUSER, ROLE_USER } from 'src/core/constants';
import { RolesService } from '../roles/roles.service';


@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService,
        public readonly rolesUserGroupService:RolesUserGroupService,
        public readonly rolesService:RolesService
    ){}

    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('')
    public getGroupInfoById(@Request() req){       
        return this.groupService.findGroupInfoById(req.query.group);
    }

    @Roles(getMaximumRolesPrivilege(ROLE_SUPERUSER))
    @Delete('')
    public deleteGroup(@Request() req){
        // console.log(req.userGroupInfo)
        // console.log(req.userGroupInfo.group.groupId);
        // return true;
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);  
    }
 
    @SkipRoleGuard()
    @Post('')
    public async createNewGroup(@Body() body:GroupCreateDto, @Request() req){
        const ownerId = req.user.id;
        const groupInfo = {
            name:body.name,
            is_active:body.isActive,  
            is_public:body.isPublic,
            description:body.description,
            creator_id:ownerId
        }
        const group = await this.groupService.create(groupInfo);
        const roles = await this.rolesService.findRoleIdByName(ROLE_SUPERUSER);
        const createRUGS = await this.rolesUserGroupService.createNewRolesForGroup(group.dataValues.id,ownerId,roles.dataValues.id);

        return {group,createRUGS};
    }

    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Patch('')
    public updateGroupInfo(@Body() body:GroupUpdateDto,@Request() req){
        return true;
    }

    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('group-code/:groupCode')
    public getGroupInfoByGroupCode(@Param('groupCode') groupCode:string,@Request() req){
        return this.groupService.findGroupInfoByGroupCode(groupCode);
    }
    
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Get('group-members')
    public getGroupMembersList(@Request() req){
        return this.rolesUserGroupService.getGroupMembersFromGroupId(req.query.group);
    }

    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('grouprole')
    public getMyGroupRole(@Request() req){
        return this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,req.user.id);
    }
}
