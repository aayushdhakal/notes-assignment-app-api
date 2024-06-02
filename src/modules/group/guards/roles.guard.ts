import { CanActivate, ExecutionContext , SetMetadata ,Injectable, UnauthorizedException, HttpStatus, HttpException, NotFoundException, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_BANNED, ROLE_INVITATION, ROLE_REQUEST } from "src/core/constants";
import { NotesService } from "src/modules/notes/notes.service";
import { RolesUserGroupService } from "src/modules/roles-user-group/roles-user-group.service";


@Injectable()
export class RolesGuard implements CanActivate{

    constructor(
        private readonly reflector:Reflector,
        private readonly rolesUserGroupService:RolesUserGroupService,
        private readonly noteService:NotesService
    ){}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        // console.log("Running the Role Guard: Class Name:-"+context.getClass(),"Handler Name"+context.getHandler());
        const request = context.switchToHttp().getRequest();
        
        // Function Declaration 
        const isThisAuthFound = (key:string) =>{
            return this.reflector.getAllAndOverride<boolean>(key,[
                context.getHandler(),
                context.getClass(),
            ])
        }

        const isSkipRoleGuard = isThisAuthFound('SkipRoleGuard');
        if(isSkipRoleGuard) return true; 
        
        //this is to get the roles on the controller like admin,moderator,user,so on.
        // If the @Roles(['superuser','admin']) is provided then this will send this array of superuser,admin
        const roles = this.reflector.get(Roles,context.getHandler());
        

        return this.validateGroupRolesAndReturnRoles(request,roles,{className:context.getClass().name,handlerName:context.getHandler().name});
        // In above context we have the userId in place along with the groupId and we can view the type of user in the group and the method he is trying to access we can now set the @Roles on the methods on the group to identify the permission which can do what in the roles guard
        // At first we need to check the permission wheather the userId belongs to the group or not 
        // for example In group controller class we can set the patch method that can be worked on by moderator by setting @Roles('moderator','admin','superadmin') we can say he has the permission for it by checking on the logic and such
    }

    async validateGroupRolesAndReturnRoles(request,roles,runningClassname){
        console.log('running Roles Guard')
        try {
            const valueTemp = await this.rolesUserGroupService.getGroupsRolesFromUserId(request.query.group,request.user.id);
            // console.log(valueTemp);
            const roleOfUserOnGroup = valueTemp[0].dataValues.role.dataValues.name;

            //checking th role of the user in the group
            if(roleOfUserOnGroup == ROLE_BANNED){
                throw new UnauthorizedException('You are banned from this group');
            }else if(roleOfUserOnGroup == ROLE_REQUEST){
                throw new UnauthorizedException('Your Request for Joining the group is still pending!.');
            }else if (roleOfUserOnGroup == ROLE_INVITATION){
                throw new UnauthorizedException('You have not accepted to join this group.Please accept to continue or else deny the Invitation.');
            }

            console.log(`roleOfUserOnGroup:- ${roleOfUserOnGroup} location:'roles.guard.ts'`)
            const groupInfo = { 
                groupId:valueTemp[0].dataValues.group_id,
                groupName:valueTemp[0].group.dataValues.name,
            };
            
            
            if(runningClassname.className == "NotesController" && runningClassname.handlerName != "createNote"){
                const note =await  this.noteService.findOneByNoteId(request.query.note);
                if(note.dataValues.user_id == request.user.id){
                    request.isNoteOwner = true;
                    console.log("isOwner is true")
                }
            }


            // check if the user has the valid permission or role for the group or not if id doen't return error
            if(!roles.includes(roleOfUserOnGroup) || request.isNoteOwner != true){
                console.log(`UnauthorizedException location:'roles.guard.ts'`)
                throw {message:`You are not authorized to perform this action`}
                // throw new UnauthorizedException('You are not authorized to perform this action');
            }
            
            request.userGroupInfo = await {
                userRole:roleOfUserOnGroup,
                RoleId:valueTemp[0].dataValues.role.dataValues.id,
                group:groupInfo
            };
            // console.log(request.userGroupInfo);
            console.log('Role Guard is Active and Workings')
            return request;

        } catch (e) {
            if(e.message){
                throw new UnauthorizedException({msg:e,message:e.message || 'Group Not Found!'});
            }
            
            throw new NotFoundException('Group Not Found!');            
        }
    }

}

export const SkipRoleGuard = ()=>SetMetadata('SkipRoleGuard',true);
export const Roles = Reflector.createDecorator<String[]>();