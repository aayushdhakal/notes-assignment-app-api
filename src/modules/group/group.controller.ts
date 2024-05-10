import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('group')
export class GroupController {

    @Post('')
    public createGroup(@Body() body){
            console.log('This is the create section of the group');
    }
}
