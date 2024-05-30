import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUIDVERSION } from "src/core/constants";
import { RoleList } from 'src/core/constants/roles-list';

export class GroupCreateDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @IsNotEmpty()
    @IsBoolean()
    readonly isActive:boolean =false;

    @IsNotEmpty()
    @IsBoolean()
    readonly isPublic:boolean=false;

    @IsNotEmpty()
    @IsString()
    readonly description:string;
    
}

export class GroupUpdateDto{
    
    @IsOptional()
    @IsString()
    readonly name?:string;

    @IsOptional()
    @IsBoolean()
    readonly isActive?:boolean;

    @IsOptional()
    @IsBoolean()
    readonly isPublic?:boolean;

    @IsOptional()
    @IsString()
    readonly description?:string;
    
}


export class AddingUserGroupDto{
    @IsNotEmpty()
    @IsUUID(UUIDVERSION)
    readonly userId:string;

    @IsNotEmpty()
    @IsString()
    readonly assignRole:RoleList;
}

export class UpdateUserRoleStatusDto{
    @IsNotEmpty()
    @IsUUID(UUIDVERSION)
    readonly userId:string;

    @IsNotEmpty()
    @IsString()
    readonly assignRole:RoleList
}