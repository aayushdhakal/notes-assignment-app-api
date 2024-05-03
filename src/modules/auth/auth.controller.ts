import {  BadRequestException,Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post ,Query,Req,Request,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordChangeDto, UserCreateDto } from '../users/dto/users.dto';
import { DoesUserExist } from './guards/doesUserExist.guard';
import { UsersService } from '../users/users.service';
import { SkipAuth } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ){}

    //this function will Run the "LocalStrategy" class and filename is "local.strategy.ts"
    // https://docs.nestjs.com/recipes/passport
    @UseGuards(LocalAuthGuard) 
    @Post('login')
    @SkipAuth()
    async login(@Request() req){
        return await  this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    @SkipAuth()
    async signup(@Body() user:UserCreateDto) {
        return await this.authService.create(user);
    }

    @Patch('password')
    async updatePassword(@Body() password:PasswordChangeDto , @Req() req ){
        return await this.authService.updateUserPassword(password,req.user.id);
    }

    //this is such that when the access token expires it uses the refresh token to get the new access token 
    @Get('access-token')
    @SkipAuth()
    async getAccessToken(@Query('refreshToken') token:string){
        if(token){
            return this.authService.getAccessTokenFromRefreshToken(token);
        }else{
            throw new BadRequestException("Refresh Token is Required!")
        }
    }
}
