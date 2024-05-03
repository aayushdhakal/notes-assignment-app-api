// If we look closely on the documentation an the practises The name suggest that it is and AuthGuard('jwt') in the brackets we have 'jwt' which means that this file is the extention of the file jwt.strategy.ts on auth folder similarly the local-auth.guard.ts is the extention file of the local.strategy.ts file
import { Body, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import CustomJWTService from "../jwt.service";
import { Observable } from "rxjs";
import { Request } from "express";

const jwtConfig = process.env;

// export class JwtAuthGuard extends AuthGuard(['strategy_jwt_1', 'strategy_jwt_2', '...']) { ... }
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(
        private reflector:Reflector,
        private jwtService:CustomJWTService
    ){
        super();
    }

    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    canActivate(context: ExecutionContext){
                
        const request = context.switchToHttp( ).getRequest<Request>();

        // if the handler has @SkipAuth,@SkipGetReqAuth decorator this below function will stop the process of authorization ,checking if the key(metadata) exits or not
        const isThisAuthFound = (key:string) =>{
            return this.reflector.getAllAndOverride<boolean>(key,[
                // <boolean> in above is appected output of this function which is 0 or 1.if there is a decorator of @SkipAuth() in the function or the class this getHandler() and getClass() will have class resulting in true(1)
                context.getHandler(), //this is related to controller method or route handler
                context.getClass(), //this is related to controller class
            ])
        }

        // check if the metadata has "IS_SKIP_AUTH" and "IS_GET_METHOD_AUTH" is present on the request or not
        const isPublic = isThisAuthFound('IS_SKIP_AUTH');
        const isGetReqAuth = isThisAuthFound('IS_GET_METHOD_AUTH');

        if(isPublic) return true;
        if(isGetReqAuth && String(request.method).toLowerCase() === 'get') return true;

        // console.log('this is from jwt.guard',context.getHandler().name,context.getClass().name);

        //get the  token from header and extract it and store it in token
        const token = this.extractTokenFromHeader(request);

        if(!token){
            throw new UnauthorizedException('Access Token Not Found-Unauthorized');
        }
        
        //get the token and validate them
        const tokenData = this.validateToken(token);

        return super.canActivate(context);
    }

    // Currently the token we have is being validated by the signature token only
    private validateToken(token:string){
        // console.log(token);
        try {
            return this.jwtService.verify(token,{
                secret:process.env.JWT_ACCESS_TOKEN_SECRET,
                issuer:process.env.JWT_ISSUER
            })
            
        } catch (error) {
            throw new UnauthorizedException(error?.message ?? 'Invalid Access Token-Unauthorized');
        }
    }

    //this request is taken from express library
    private extractTokenFromHeader(req: Request): string | undefined{

        // This is so that the bearer and the token is seperated  from each other in simple language processing of the token
        const authHeader = req.headers.authorization;
        const [type,token] = authHeader?.split(' ')??[];
        return type === 'Bearer' ? token : undefined;
    }

}

export const JwtAuthGuardProvider ={
    provide:APP_GUARD,
    useClass:JwtAuthGuard
}

// here we have the function to set the meta data if we run this function on the method
// if we put this as the alias in the method or to the class then this will stop the jwt authentication to process
// inside of the class JwtAuthGuard canActivate  method with isThisAuthFound() method will not let process further
// In laymans terms this makes the class and the route public if added to the controller for this we use "Reflector Class"
export const SkipAuth = ()=>SetMetadata('IS_SKIP_AUTH',true);
export const SkipGetReqAuth = ()=>SetMetadata('IS_GET_METHOD_AUTH',true);