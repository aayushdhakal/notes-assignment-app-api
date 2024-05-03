import { Injectable,BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import CustomJWTService from './jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:CustomJWTService
    ){}

    async validateUser( username:string, enteredPassword:string ){
        let user = await this.usersService.findOneByUsername(username);

        if(!user){
            user = await this.usersService.findOneByEmail(username);
        }

        if(!user){
            return null;
        }

        const match = await this.comparePassword(enteredPassword,user.password);
        if(!match){
            return null;
        }

        const {password, ...result} = user['dataValues'];
        return  result;
    }

    async login( user ){
        const access_token = await this.jwtService.generateAccessToken(user);
        const refresh_token = await this.jwtService.generateRefreshToken(user);
        return { user,access_token,refresh_token }
    }

    async create ( user ){

        const pass = await this.hashPassword(user.password);
        const newUser = await this.usersService.create({...user , password : pass});

        const {password , ...result} = newUser['dataValues'];
        const access_token = await this.jwtService.generateAccessToken(result);
        const refresh_token = await this.jwtService.generateRefreshToken(result);

        return {user:result ,access_token , refresh_token};
    }

    async getAccessTokenFromRefreshToken(refreshToken:string){
        //get the refresh token data and verify it and return access token data if the refresh token is valid
        const tokenData = await this.jwtService.verifyRefreshToken({token:refreshToken});

        //generate new access token and refresh token for security reasons.
        if(tokenData.isValid){
            const access_token = await this.jwtService.generateAccessToken({user:tokenData.data});
            const refresh_token = await this.jwtService.generateRefreshToken({user:tokenData.data});
            return {user:tokenData.data,access_token,refresh_token}
        }

        return "Token data is Invalid";
    }   

    async hashPassword(password){
        const hash = await bcrypt.hash(password,10);
        return hash;
    }

    async comparePassword(enteredPassword,dbPassword){
        const match = await bcrypt.compare(enteredPassword,dbPassword);
        return match;
    }

    async updateUserPassword({oldPassword,newPassword},id){
        const user = await this.usersService.findOneById(id);
        const checkPassword = await this.comparePassword(oldPassword,user.dataValues['password']);

        if(!checkPassword){
            throw new BadRequestException('Invalid password'); 
        }

        const newHashedPassword = await this.hashPassword(newPassword);
        user.password = newHashedPassword;
        user.save();
        const {password,...rest}= user['dataValues'] ;
        return {message:"Password has changed",rest}
    }

}
