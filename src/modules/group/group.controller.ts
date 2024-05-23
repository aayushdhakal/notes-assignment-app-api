import { Body, Controller, Get, Post, UseGuards ,Request, Param, ParseUUIDPipe, Patch, Delete } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto } from './dto/group.dto';
import { RolesGuard, SkipRoleGuard } from './guards/roles.guard';
import { GroupService } from './group.service';

@Controller('group')
@UseGuards(RolesGuard)
export class GroupController {
    constructor(
        public readonly groupService:GroupService
    ){}
 
    @SkipRoleGuard()
    @Post('')
    public createNewGroup(@Body() body:GroupCreateDto, @Request() req){
        const ownerId = req.user.id;
        const groupInfo = {...body,owner_id:ownerId}
        console.log(groupInfo);
        //const groupInfo =  await this.groupService.create(body)
        
        return true;
    }

    @Patch(':id')
    public updateGroup(@Param('id',ParseUUIDPipe) id:string,@Body() body:GroupUpdateDto,@Request() req){
        return true;
    }

    @Delete(':id')
    public deleteGroup(@Param('id',ParseUUIDPipe) id:string ,@Request() req){
        return true;
    }

    @Get(':id')
    public getGroupInfoById(@Param('id',ParseUUIDPipe) id:string, @Request() req){
        return true
    }

    @Get(':groupCode')
    public getGroupInfoByGroupCode(@Param('groupCode') groupCode:string,@Request() req){
        return true
    }
}
