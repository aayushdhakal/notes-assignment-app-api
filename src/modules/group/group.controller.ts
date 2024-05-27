import { Body, Controller, Get, Post, UseGuards, Request, Param, ParseUUIDPipe, Patch, Delete, ConsoleLogger, Query } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto } from './dto/group.dto';
import { Roles, RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';
import { RolesUserGroupService } from '../roles-user-group/roles-user-group.service';
import { getMaximumRolesPrivilege } from 'src/core/constants/roles-list';
import { ROLE_ADMIN, ROLE_MODERATOR, ROLE_SUPERUSER, ROLE_USER } from 'src/core/constants';


@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService,
        public readonly rolesUserGroupService:RolesUserGroupService,
    ){}

    @Roles(getMaximumRolesPrivilege(ROLE_MODERATOR))
    @Get('')
    public getGroupInfoById(@Request() req){       
        return this.groupService.findGroupInfoById(req.query.group);
    }

    @Roles(getMaximumRolesPrivilege(ROLE_SUPERUSER))
    @Delete(':id')
    public deleteGroup(@Param('id',ParseUUIDPipe) id:string ,@Request() req){
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);  
    }
 
    @SkipRoleGuard()
    @Post('')
    public createNewGroup(@Body() body:GroupCreateDto, @Request() req){
        const ownerId = req.user.id;
        const groupInfo = {
            name:body.name,
            is_active:body.isActive,
            is_public:body.isPublic,
            description:body.description,
            creator_id:ownerId
        }
        const group = this.groupService.create(groupInfo);
        // console.log(group)
        //const groupInfo =  await this.groupService.create(body)
        return group;
    }

    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Patch(':id')
    public updateGroupInfo(@Param('id',ParseUUIDPipe) id:string,@Body() body:GroupUpdateDto,@Request() req){
        return true;
    }

    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('group-code:groupCode')
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
