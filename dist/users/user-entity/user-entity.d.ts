import { ConfigEntity } from "src/configurations/config-entity/config-entity";
import { Game } from "src/games/entities/game.entity";
import { Participation } from '../../participations/entities/participation.entity';
export declare class UserEntity {
    id: string;
    name: string;
    last_name: string;
    username: string;
    pass: string;
    role: string;
    config: ConfigEntity;
    game: Game[];
    participations: Participation[];
}
