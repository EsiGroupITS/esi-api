import { ConfigDto } from "src/configurations/config-dto/config-dto";
import { Participation } from "src/participations/entities/participation.entity";
import { CreateGameDto } from '../../games/dto/create-game.dto';
export declare class UserDto {
    id: string;
    name: string;
    last_name: string;
    username: string;
    pass: string;
    role: string;
    config: ConfigDto;
    game: CreateGameDto;
    participations: Participation;
}
