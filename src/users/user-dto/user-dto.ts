import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ConfigDto } from "src/configurations/config-dto/config-dto"
import { CreateGameDto } from '../../games/dto/create-game.dto';
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/auth/roles/role-enum/role-enum";

export class UserDto {
    @ApiProperty()
    id:string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name:string
    @IsString()
    @ApiProperty()
    last_name: string
    @IsEmail()
    @ApiProperty()
    username: string
    @IsString()
    @ApiProperty()
    pass: string
    @ApiProperty({
        enum: RoleEnum
    })
    role: string

    //! Relational
    @ApiProperty({
        type: () => ConfigDto
    })
    config: ConfigDto

    @ApiProperty({
        type: () => CreateGameDto
    })
    game: CreateGameDto
}
