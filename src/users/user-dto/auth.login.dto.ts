import { ApiProperty } from "@nestjs/swagger"

export class AuthLoginDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    pass: string
}