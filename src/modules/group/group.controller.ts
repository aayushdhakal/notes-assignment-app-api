import { Body, Controller, Get, Post, UseGuards, Request, Param,Query, ParseUUIDPipe, Patch, Delete, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto,AddingUserGroupDto,UpdateUserRoleStatusDto, BannedUserMemberDto, LiftUserBannedFromGroup, RemovingUserFromGroupDto } from './dto/group.dto';
import { Roles, RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';
import { RolesUserGroupService } from '../roles-user-group/roles-user-group.service';
import { getMaximumRolesPrivilege, getMinimumRolesList } from 'src/core/constants/roles-list';
import { ROLE_ADMIN, ROLE_MODERATOR, ROLE_SUPERUSER, ROLE_USER ,ROLE_REQUEST, ROLE_BANNED } from 'src/core/constants';
import { RolesService } from '../roles/roles.service';


    /*
        GROUP MODEL { name. description , isPublic, isActive }

        if the @SkipRoleGuard() is active it is not required to take the { @Param() group } from the API 
    */

@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService,
        public readonly rolesUserGroupService:RolesUserGroupService,
        public readonly rolesService:RolesService
    ){}


    /*
    route as 'api/v1/group' POST method 
    this ia a route which is used to create a new group on the database table 
    this will use the model of the group to save the provided data to the database
    */
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
        // console.log(roles);
        const createRUGS = await this.rolesUserGroupService.createNewRolesForGroup(group.dataValues.id,ownerId,roles.dataValues.id);

        return {group,createRUGS};
    }


    /*
    route as 'api/v1/group/join-group' POST method
    this ia a route which is used to request to join a group using group id and user id
    this route takes the group_id from the request query and take the user_id from the accessed token parsed from the jwt auth guard and process it to the user 
    */
    @SkipRoleGuard()
    @Post('join-group')
    async requestUserToJoinGroup(@Request() req){
        // const group = req.query.group;
        const request = await this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,req.user.id);

        // check if the value is returned greater than 0 then means it has previosuly sent the request or is already part of this group if the user has already sent the request then first block of the code is executed and if the user has the role of any other than ROLE_REQUEST(may be 'admin' ,'user' so on ) then it will run the second block of code 
        if(request.length > 0 && request[0].dataValues.role.dataValues.name == ROLE_REQUEST ){
            throw new BadRequestException('You have already requested to join this group.');
        }else if(request.length > 0 && request[0].dataValues.role.dataValues.name == ROLE_BANNED){
            throw new UnauthorizedException('You have beened banned from this group.');
        }else if((request.length > 0  )){
            throw new BadRequestException('You Are the part of this Group.');
        }
        
        //get the role Id from the group.
        const roles = await this.rolesService.findRoleIdByName(ROLE_REQUEST);
        const rUGS = await this.rolesUserGroupService.createNewRolesForGroup(req.query.group,req.user.id,roles.dataValues.id);

        return {rUGS,message:"Request to Join Group has been Sent."}
    }


    /*
    route as 'api/v1/group/', GET method , can only be accessed by user and above
    this ia a route which is used to get the information about the the group name, description , public type, active type.
    */
    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('')
    public getGroupInfoById(@Request() req){       
        return this.groupService.findGroupInfoById(req.query.group);
    }



    /*
    route as 'api/v1/group/', DELETE method , can only be accessed by superuser
    this ia a route which is used to delete the group.
    */
    @Roles(getMaximumRolesPrivilege(ROLE_SUPERUSER))
    @Delete('')
    public deleteGroup(@Request() req){
        return this.groupService.deleteGroup(req.userGroupInfo.group.groupId);  
    }
 

    /*
    route as 'api/v1/group/', PATCH method , can only be accessed by admin and above
    this ia a route which is used to delete the group.
    */
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


    /*
    route as 'api/v1/group/group-code',Param as :groupCode, GET method , can only be accessed by user and above
    this ia a route which is used to delete the group.
    */
    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('group-code/:groupCode')
    public getGroupInfoByGroupCode(@Param('groupCode') groupCode:string,@Request() req){
        return this.groupService.findGroupInfoByGroupCode(groupCode);
    }
    

    /*
    route as 'api/v1/group/group-mombers', GET method , can only be accessed by admin and above
    this ia a route which is used to get the list of group members of the given group.
    */
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Get('group-members')
    public getGroupMembersList(@Request() req){
        return this.rolesUserGroupService.getGroupMembersFromGroupId(req.query.group);
    }


    /*
    route as 'api/v1/group/my-group-role', GET method , can only be accessed by user and above
    this ia a route which is used to get the list of role of group members of the group.
    */
    @Roles(getMaximumRolesPrivilege(ROLE_USER))
    @Get('my-group-role')
    public getMyGroupRole(@Request() req){
        return this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,req.user.id);
    }


    /*
    route as 'api/v1/group/add-user-group', POST method , can only be accessed by admin and above
    this ia a route which is used to add a user to the group.
    body:{
        assignRole:'admin',       'admin','user' so on.
        userId:'...'     
    }
    */
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Post('add-user-group')
    async addUserToGroup(@Body() body:AddingUserGroupDto,@Request() req){
        const request = await this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,body.userId);

        if(request.length > 0 && request[0].dataValues.role.dataValues.name != ROLE_REQUEST ){
            throw new BadRequestException('You have already part of this Group');
        }
        const roleId = await this.rolesService.findRoleIdByName(body.assignRole);
        return this.rolesUserGroupService.createNewRolesForGroup(req.query.group,req.user.id,roleId.dataValues.id);
    }

    
    /*
    route as 'api/v1/group/update-user-group-role', POST method , can only be accessed by admin and above
    this ia a route which is used to update a user of the group.
        body:{
        assignRole:'..',   'admin','user' so on.
        userId:'...'
    }
    */
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Post('update-user-group-role') 
    async updateUserRoleStatus(@Body() body:UpdateUserRoleStatusDto,@Request() req){
        // groupId:string,userId:string,newUserRole:RoleList,
        // {body.groupId,body.userId,body.assignRole} 
        
        //get the user role from the group which role is being updated
        const request = await this.rolesUserGroupService.getGroupsRolesFromUserId(req.query.group,body.userId);

        if(request.length < 1){
            throw new NotFoundException('User not found in the Group. User need to belong to this group to update the role.')
        }

        if(request[0].dataValues.role.name == body.assignRole){
            throw new BadRequestException('User is same as the assigned Role.');
        }
        
        // check if the working user is super user or not and the working can only add the roles as much as he has.For. eg the user which is admin in the working group can only give priviledge till admin roll not upper role.
        if( req.userGroupInfo.userRole != ROLE_SUPERUSER && !(getMinimumRolesList(req.userGroupInfo.userRole).includes(body.assignRole)) ){
            throw new BadRequestException(`You cannot perform this Action.`);
        } 

        const role = await this.rolesService.findRoleIdByName(body.assignRole);
        return this.rolesUserGroupService.updateRolesGroup(req.query.group,body.userId,role.dataValues.id);        
    }

    
    /*
    route as 'api/v1/group/update-user-group-role', POST method , can only be accessed by admin and above
    this ia a route which is used to remove (Not Banned) a user to the group.
    body:{
        userId:'...'
    }
    */
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Delete('remove-user-from-group')
    async removeMemberFromGroup(@Body() body:RemovingUserFromGroupDto,@Request() req){
        return await this.rolesUserGroupService.removeUserFromGroup(req.query.group,body.userId);
    }


    /*
    route as 'api/v1/group/banned-user-', POST method , can only be accessed by admin and above
    this ia a route which is used to banned a user of the group.
    body:{
        userId:'...'
    }
    */
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Post('banned-user-from-group')
    async bannedMemberofGroup(@Body() body:BannedUserMemberDto,@Request() req){
        const bannedRoleId = await this.rolesService.findRoleIdByName(ROLE_BANNED);
        return await this.rolesUserGroupService.updateRolesGroup(req.query.group,body.userId,bannedRoleId.dataValues.id);
    }


    /*
    route as 'api/v1/group/banned-user-', POST method , can only be accessed by admin and above
    this ia a route which is used to lift ban of  a user from the group.
    body:{
        userId:'...'
    }
    */
    @Roles(getMaximumRolesPrivilege(ROLE_ADMIN))
    @Post('lift-ban-from-group')
    async liftBannedUserofGroup(@Body() body:LiftUserBannedFromGroup,@Request() req){
        const bannedRoleId = await this.rolesService.findRoleIdByName(ROLE_USER);
        return await this.rolesUserGroupService.updateRolesGroup(req.query.group,body.userId,bannedRoleId.dataValues.id);
    }   
}
