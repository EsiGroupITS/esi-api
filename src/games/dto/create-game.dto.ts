import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserDto } from "src/users/user-dto/user-dto";


export class CreateGameDto {

    id: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty({
        type: () => UserDto
    })
    user: UserDto;


}