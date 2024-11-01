import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUpdateUserDto {
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
