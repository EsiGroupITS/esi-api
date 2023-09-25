import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/user-entity/user-entity';
import { Participation } from '../../participations/entities/participation.entity';

@Entity('games')

export class Game {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        unique: true
    })
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    // Relación game-user

    @OneToMany(
        () => UserEntity,
        ( user ) => user.game,
        //{ eager: true } //carga automáticamente la relación entre los usuarios y games
    )
    user:UserEntity

    @OneToMany(
        () => Participation,
        ( game ) =>  game.gameParticipation,
    )
    game: UserEntity

}
