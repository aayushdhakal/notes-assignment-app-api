import { Body, Controller, Get, Post, UseGuards ,Request, Param, ParseUUIDPipe, Patch, Delete, ConsoleLogger } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto } from './dto/group.dto';
import { Roles, RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';
import { RolesUserGroupService } from '../roles-user-group/roles-user-group.service';

@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService,
        public readonly rolesUserGroupService:RolesUserGroupService,
    ){}

    @Roles(['superuser','admin','moderator','user'])
    @Get('')
    public getGroupInfoById(@Request() req){       
        return this.groupService.findGroupInfoById(req.query.group);
    }

    @Roles(['superuser'])
    @Delete(':id')
    public deleteGroup(@Param('id',ParseUUIDPipe) id:string ,@Request() req){
        this.groupService.deleteGroup(req.userGroupInfo.group.groupId);
        return true;
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

    @Roles(['superuser','admin'])
    @Patch(':id')
    public updateGroupInfo(@Param('id',ParseUUIDPipe) id:string,@Body() body:GroupUpdateDto,@Request() req){
        return true;
    }

    @Roles(['superuser','admin','moderator','user'])
    @Get('group-code:groupCode')
    public getGroupInfoByGroupCode(@Param('groupCode') groupCode:string,@Request() req){
        return true
    }
    
    @Roles(['superuser','admin'])
    @Get('group-members')
    public getGroupMembersList(@Request() req){
        console.log(req.query.group+' group code');
        return this.rolesUserGroupService.getGroupMembersFromGroupId(req.query.group);
    }
}
