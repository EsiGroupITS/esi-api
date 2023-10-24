import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { UserEntity } from '../../users/user-entity/user-entity';

@Entity('games')

export class Game {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        unique: true
    }
    )
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;


    // Relación game-user
    @ManyToOne(() => UserEntity, (user) => user.game,
        {eager: true}
    )
    user: UserEntity;
}
