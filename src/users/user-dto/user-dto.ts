import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ConfigDto } from "src/configurations/config-dto/config-dto"
import { CreateGameDto } from '../../games/dto/create-game.dto';

export class UserDto {
    id:string
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    last_name: string
    @IsEmail()
    username: string
    @IsString()
    pass: string
    role: string

    //! Relational
    config: ConfigDto

    game: CreateGameDto
}
