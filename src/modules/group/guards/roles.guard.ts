import { CanActivate, ExecutionContext , SetMetadata ,Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


@Injectable()
export class RolesGuard implements CanActivate{

    constructor(
        private reflector:Reflector,
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

        return this.validateGroupRolesAndReturnRoles(request);
    }

    async validateGroupRolesAndReturnRoles(request){

        console.log(request)
        return request;
    }

}

export const SkipRoleGuard = ()=>SetMetadata('SkipRoleGuard',true);