import { Body, Controller, Get, Post, UseGuards, Request, Param,Query, ParseUUIDPipe, Patch, Delete, BadRequestException } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto,AddingUserGroupDto } from './dto/group.dto';
import { Roles, RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';
import { RolesUserGroupService } from '../roles-user-group/roles-user-group.service';
import { RoleList, getMaximumRolesPrivilege } from 'src/core/constants/roles-list';
import { ROLE_ADMIN, ROLE_MODERATOR, ROLE_SUPERUSER, ROLE_USER ,ROLE_REQUEST } from 'src/core/constants';
import { RolesService } from '../roles/roles.service';


@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService,
        public readonly rolesUserGroupService:RolesUserGroupService,
        public readonly rolesService:RolesService
    ){}

    @SkipRoleGuard()
    @Post('')
    async createNewGroup(@Body() body:GroupCreateDto, @Request() req){
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

    @SkipRoleGuard()
    @Post('join-group')
    async requestUserToJoinGroup(@Request() req){
        // const group = req.query.group;
        const request = await this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,req.user.id);

        if(request.length > 0 && request[0].dataValues.role.dataValues.name == ROLE_REQUEST ){
            throw new BadRequestException('You have already requested to join this group.');
        }else if((request.length > 0  )){
            throw new BadRequestException('You Are the part of this Group.');
        }
        
        const roles = await this.rolesService.findRoleIdByName(ROLE_REQUEST);
        const rUGS = await this.rolesUserGroupService.createNewRolesForGroup(req.query.group,req.user.id,roles.dataValues.id);

        return {rUGS,message:"Request to Join Group has been Sent."}
    }

    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('')
    public getGroupInfoById(@Request() req){       
        return this.groupService.findGroupInfoById(req.query.group);
    }

    @Roles(getMaximumRolesPrivilege(ROLE_SUPERUSER))
    @Delete('')
    public deleteGroup(@Request() req){
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);  
    }
 
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Patch('')
    async updateGroupInfo(@Body() body:GroupUpdateDto,@Request() req){
        
        const {name,description,isPublic,isActive} = body;
        const tempVal:{
            name?: string,
            description?: string,
            is_public?: boolean,
            is_active?: boolean 
        }= {};

        if(name){tempVal.name=name}
        if(description){tempVal.description=description}
        if(isPublic == true){
            tempVal.is_public=true
        }else if(isPublic == false){
            tempVal.is_public=false
        }
        if(isActive == true){
            tempVal.is_active=true
        }else if(isActive == false){
            tempVal.is_active=false
        }

        // console.log()
        return await this.groupService.updateGroupInfo(req.userGroupInfo.group.groupId,tempVal);        
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
    @Get('my-group-role')
    public getMyGroupRole(@Request() req){
        return this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,req.user.id);
    }

    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Post('add-user-group')
    async addUserToGroup(@Body() body:AddingUserGroupDto,@Request() req){
        const request = await this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,body.userId);

        console.log(request[0].dataValues.role);

        if(request.length > 0 && request[0].dataValues.role.dataValues.name != ROLE_REQUEST ){
            throw new BadRequestException('You have already part of this Group');
        }
        return true;
    }

    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    public updateUserRoleStatus(userId:string,newUserRole:RoleList,@Request() req){
        // At first check for the current role of the user in the particular group and then only proceed with that logic 
        // check for the condition that if the permission giving user is of admin he/she can only assign new role till admin priviledge only not super user
        // then use the logic to assign the role or remove the role to the user properly
        return true;
    }

    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    public removeMemberFromGroup(userId:string,groupId:string){

        return true;
    }

    
}
