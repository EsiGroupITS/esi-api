import { UserDto } from "src/users/user-dto/user-dto"

export class ConfigDto {
    id:string
    gamma:boolean

    //! Relational
    user: UserDto
}
