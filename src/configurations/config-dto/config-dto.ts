import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "src/users/user-dto/user-dto"

export class ConfigDto {
    @ApiProperty()
    id:string
    
    @ApiProperty()
    contrast_black: boolean

    @ApiProperty()
    text_size: boolean

    @ApiProperty()
    text_spacing: boolean

    @ApiProperty()
    high_visibility: boolean

    @ApiProperty()
    fontDyslexic: boolean

    //! Relational
    @ApiProperty({
        type: () => UserDto
    })
    user: UserDto
}
