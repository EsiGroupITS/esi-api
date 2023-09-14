import { UserDto } from "src/users/user-dto/user-dto"

export class ConfigDto {
    id:string
    
    contrast_black: boolean

    text_size: boolean

    text_spacing: boolean

    high_visibility: boolean

    fontDyslexic: boolean

    //! Relational
    user: UserDto
}
