import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUpdatePostDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;


    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;
}