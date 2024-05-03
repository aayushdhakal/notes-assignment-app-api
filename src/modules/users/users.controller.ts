import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDTO,PasswordChangeDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ){}

    // @Delete(':id')
    // async deleteUser(@Param('id' , ParseUUIDPipe) id:string){ //ParseUUIDPipe is used to validate the @Paramid
    //     const count = await this.userService.deleteUser(id);
    //     return {deleted_count:count};
    // }

    @Delete('')
    async deleteAccount(@Request() req){

        //get the username or the id from the access token or something like that
        return this.userService.deleteUser(req.user.id);
        // const count = await this.userService.deleteUser();
        // return {deleted_count:count};
    }

    @Get('')
    async getDetails(@Request() req){
        return this.userService.findOneById(req.user.id);
    }

    @Patch('') 
    async updateUser(@Body() userUpdateInfo:UserUpdateDTO,@Request() req ){

        const {name,email,phoneNumber,username} = userUpdateInfo;

        const tempVal:{
            name?: string,
            email?: string,
            phoneNumber?: string,
            username?: string
        }= {};

        if(name){tempVal.name=name}
        if(email){tempVal.email=name}
        if(phoneNumber){tempVal.phoneNumber=name}
        if(username){tempVal.username=name}

        console.log(tempVal);
        return this.userService.updateOne(req.user.id,tempVal);
    }
}
