import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService:AuthService
    ){ 
        super(); 
    }

    // In here the by default the passport local strategy expects properties called username and password in the request body http://www.passportjs.org/docs/configure/
    // we add LocalStrategy to our auth.module.ts as a provider
    async validate( username:string, password:string ):Promise<any>{
        const user = await this.authService.validateUser(username,password);

        if(!user){
            throw new UnauthorizedException('Invalid user credentials');
        }
        return user;
    }
}