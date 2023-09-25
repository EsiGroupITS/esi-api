import { ConfigEntity } from "src/configurations/config-entity/config-entity";
import { Game } from "src/games/entities/game.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Participation } from '../../participations/entities/participation.entity';

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

    @ManyToOne(
        () => Game,                 // apuntamos a la entidad Game
        ( game ) => game.user)      // creamos una nueva instancia de game, y ese game se relaciona con la Tabla game, y el atributo user
        game: Game[];

    // Relación usuario con participations

    @OneToMany(
        () => Participation,
        ( participation ) => participation.userParticipation )
        participation: Participation

}
