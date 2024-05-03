import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum ViewTypeEnum{
    PUBLIC='public',
    PRIVATE ='private'
}

export class NoteCreateDto{

    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly description:string;

    @IsNotEmpty()
    @IsBoolean()
    readonly is_active:boolean = false;

    @Transform(({value}) =>(""+value).toLowerCase())
    @IsEnum(ViewTypeEnum)
    readonly view_type?:ViewTypeEnum;
}



export class NoteUpdateDto{
    readonly name?:string;
    readonly description?:string;
    readonly is_active?:boolean;
}