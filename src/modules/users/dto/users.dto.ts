import { IsNotEmpty, IsString,IsEmail, IsNumber, MinLength,Length, IsOptional } from "class-validator";

export class UserCreateDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly username:string;

    @IsNotEmpty()
    @IsString()
    @Length(10,10)
    readonly phoneNumber:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8,{
        message:"Password must be at least 8 characters long"
    })
    readonly password:string;
}

export class UserUpdateDTO{
    
    @IsString()
    @IsOptional()
    readonly name?:string;

    @IsString()
    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly username?:string;

    @IsString()
    @Length(10,10)
    @IsOptional()
    readonly phoneNumber?:string;
}

export class PasswordChangeDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(8,{
        message:"Password must be at least 8 characters long"
    })
    readonly newPassword:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8,{
        message:"Password must be at least 8 characters long"
    })
    readonly oldPassword:string;
}
