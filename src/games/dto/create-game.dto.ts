import { IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { UserDto } from "src/users/user-dto/user-dto";


export class CreateGameDto {

    //@IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category?: string;

    username: string;


}