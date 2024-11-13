import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUpdateBlogDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;


    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @IsNotEmpty()
    tags: object;
}