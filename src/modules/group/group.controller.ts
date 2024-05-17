import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GroupDto } from './dto/group.dto';
import { RolesGuard, SkipRoleGuard } from './guards/roles.guard';

@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
 
    @Post('')
    @SkipRoleGuard()
    public createGroup(@Body() body){
        console.log(body);
        return true;
    }

}
