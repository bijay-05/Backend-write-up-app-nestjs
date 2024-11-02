import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    useremail: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    following: object;
}


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    useremail: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    following: object;
}