import { CanActivate, ExecutionContext , SetMetadata ,Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RolesUserGroupService } from "src/modules/roles-user-group/roles-user-group.service";


@Injectable()
export class RolesGuard implements CanActivate{

    constructor(
        private readonly reflector:Reflector,
        private readonly rolesUserGroupService:RolesUserGroupService
    ){}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const isThisAuthFound = (key:string) =>{
            return this.reflector.getAllAndOverride<boolean>(key,[
                context.getHandler(),
                context.getClass(),
            ])
        }
        const isSkipRoleGuard = isThisAuthFound('SkipRoleGuard');
        if(isSkipRoleGuard) return true; 

        //this is to get the roles on the controller like admin,moderator,user,so on.
        const roles = this.reflector.get(Roles,context.getHandler());

        return this.validateGroupRolesAndReturnRoles(request,roles);
        // In above context we have the userId in place along with the groupId and we can view the type of user in the group and the method he is trying to access we can now set the @Roles on the methods on the group to identify the permission which can do what in the roles guard
        // At first we need to check the permission wheather the userId belongs to the group or not 
        // for example In group controller class we can set the patch method that can be worked on by moderator by setting @Roles('moderator','admin','superadmin') we can say he has the permission for it by checking on the logic and such
    }

    async validateGroupRolesAndReturnRoles(request,roles){

        console.log('userId :- ' + request.user.id);
        console.log('groupId :- ' + request.params.id);
        console.log('list the roles of the controller:- '+roles);

        const valueTemp = await this.rolesUserGroupService.getGroupsRolesFromUserId(request.user.id,request.params.id);

        const roleOfUserOnGroup = valueTemp[0].dataValues.role.dataValues.name;
        const groupName = valueTemp[0].dataValues.group.dataValues.name;

        console.log('\n Roles of user '+roleOfUserOnGroup,'\n Group Name '+groupName,'\n Allowed Roles '+roles);

        return request;
    }

}

export const SkipRoleGuard = ()=>SetMetadata('SkipRoleGuard',true);
export const Roles = Reflector.createDecorator<String[]>();