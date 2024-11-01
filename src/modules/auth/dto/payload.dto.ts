import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    useremail: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RefreshDto {
    @IsNotEmpty()
    @IsString()
    token: string;
}