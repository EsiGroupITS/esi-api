import { Game } from 'src/games/entities/game.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { UserEntity } from '../../users/user-entity/user-entity';

@Entity('participations')
export class Participation {

    @PrimaryGeneratedColumn('uuid')
    id:string;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;


    // Relación muchos a uno con users
    @ManyToOne(
        () => UserEntity,
        ( userParticipation ) => userParticipation.participation,
        { eager: true })
        userParticipation: UserEntity

}
