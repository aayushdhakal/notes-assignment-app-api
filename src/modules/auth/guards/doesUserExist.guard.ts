import { Injectable,CanActivate, ExecutionContext, ForbiddenException,BadRequestException } from "@nestjs/common"; 
import { Observable } from "rxjs";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class DoesUserExist implements CanActivate{
    constructor(private readonly usersService:UsersService){}

    canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
          const request = context.switchToHttp().getRequest();
          return this.validateRequest(request);
      }

    async validateRequest(request){

        if(!request.body.email){
            throw new BadRequestException('Email is not provided');
        }

        const userExist = await this.usersService.findOneByEmail(request.body.email);
        if( userExist ){
            throw new ForbiddenException('This email already exists');
        }
        return true;
    }
}