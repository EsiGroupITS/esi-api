import { ConfigEntity } from "src/configurations/config-entity/config-entity";
import { Game } from "src/games/entities/game.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    name: string

    @Column('varchar')
    last_name: string

    @Column('varchar')
    username: string

    @Column('varchar')
    pass: string

    @Column('varchar', { default: 'USER' })
    role: string

    // Relación usuario con configuración

    @ManyToOne(()=> ConfigEntity, (config)=> config.user)
    config: ConfigEntity

    //Relación usuario con game, permite saber qué usuario creó un game
    @OneToMany(() => Game, (game) => game.user)
    game: Game[];

}
