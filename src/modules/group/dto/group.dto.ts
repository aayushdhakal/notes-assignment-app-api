import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";


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