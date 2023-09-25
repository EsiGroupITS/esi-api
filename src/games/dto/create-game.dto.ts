import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateGameDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category?: string;
}