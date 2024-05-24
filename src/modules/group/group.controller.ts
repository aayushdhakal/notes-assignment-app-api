import { Body, Controller, Get, Post, UseGuards ,Request, Param, ParseUUIDPipe, Patch, Delete, ConsoleLogger } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto } from './dto/group.dto';
import { Roles, RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';

@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService
    ){}

    @Roles(['superuser','admin','moderator','user'])
    @Get(':id')
    public getGroupInfoById(@Param('id',ParseUUIDPipe) id:string, @Request() req){       
        return this.groupService.findGroupInfoById(req.userGroupInfo.group.groupId);
    }

    @Roles(['superuser'])
    @Delete(':id')
    public deleteGroup(@Param('id',ParseUUIDPipe) id:string ,@Request() req){
        this.groupService.deleteGroup(req.userGroupInfo.group.groupId);
        return true;
    }

 
    @SkipRoleGuard()
    @Post('')
    public createNewGroup(@Body() body:GroupCreateDto, @Request() req){
        const ownerId = req.user.id;
        const groupInfo = {...body,owner_id:ownerId}
        console.log(groupInfo);
        //const groupInfo =  await this.groupService.create(body)
        
        return true;
    }

    @Roles(['superuser','admin'])
    @Patch(':id')
    public updateGroupInfo(@Param('id',ParseUUIDPipe) id:string,@Body() body:GroupUpdateDto,@Request() req){
        return true;
    }




    @Roles(['superuser','admin','moderator','user'])
    @Get(':groupCode')
    public getGroupInfoByGroupCode(@Param('groupCode') groupCode:string,@Request() req){
        return true
    }
}
