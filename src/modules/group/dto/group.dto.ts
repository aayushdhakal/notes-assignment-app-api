import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ROLE_ADMIN, ROLE_BANNED, ROLE_CONTRIBUTOR, ROLE_GUEST, ROLE_INVITATION, ROLE_MODERATOR, ROLE_REQUEST, ROLE_SUPERUSER, ROLE_USER, UUIDVERSION } from "src/core/constants";
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

enum RolesListEnum {
    SUPERUSER= ROLE_SUPERUSER, 
    ADMIN = ROLE_ADMIN ,
    MODERATOR = ROLE_MODERATOR ,
    CONTRIBUTOR = ROLE_CONTRIBUTOR, 
    USER = ROLE_USER ,
    GUEST = ROLE_GUEST, 
    REQUEST = ROLE_REQUEST ,
    BANNED = ROLE_BANNED, 
    INVITATION = ROLE_INVITATION ,
}

export class AddingUserGroupDto{
    @IsNotEmpty()
    @IsUUID(UUIDVERSION)
    readonly userId:string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(RolesListEnum)
    readonly assignRole:string;
}

export class UpdateUserRoleStatusDto extends AddingUserGroupDto{}