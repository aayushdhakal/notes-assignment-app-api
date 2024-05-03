// jwt.strategy.ts is mainly related to authorization of the user wheather the user has proper privelage to do certain task or not it is mainly crreated after the process of creation of the jwt.service.ts
// https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt , Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly usersService:UsersService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_ACCESS_TOKEN_SECRET,
            issuer:process.env.JWT_ISSUER,
            jsonWebTokenOptions:{
                expiresIn:process.env.TOKEN_EXPIRATION || '7d'
            }
        })
    }

    async validate(payload:any){
        // console.log("this is the payload that use the auth");
        const user = await this.usersService.findOneById(payload.id);
        if(!user){
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return payload;
    }
    
}