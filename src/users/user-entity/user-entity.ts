import { ConfigEntity } from "src/configurations/config-entity/config-entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=> ConfigEntity, (config)=> config.user)
    config: ConfigEntity
}
