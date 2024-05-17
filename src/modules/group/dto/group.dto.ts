import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class GroupDto{
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