import { TypeOrmModuleOptions } from "@nestjs/typeorm";

//! Inject config module
import * as dotenv from 'dotenv'; 
import { ConfigEntity } from "src/configurations/config-entity/config-entity";
import { Game } from "src/games/entities/game.entity";
import { UserEntity } from "src/users/user-entity/user-entity";

dotenv.config();

const dbUrl = `postgres://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: dbUrl,
    entities: [ /* include entities here */
        UserEntity,
        ConfigEntity,
        Game,
    ],
    autoLoadEntities: true,
    synchronize: true // set to false in production
};

export default dbConfig;
