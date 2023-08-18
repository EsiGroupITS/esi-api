import { UserEntity } from "src/users/user-entity/user-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('configurations')
export class ConfigEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('boolean', { default: false })
    gamma: boolean

    @OneToMany(()=> UserEntity, (user)=> user.config)
    user: UserEntity[]
}
