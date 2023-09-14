import { UserEntity } from "src/users/user-entity/user-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('configurations')
export class ConfigEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('boolean', { default: false })
    contrast_black: boolean

    @Column('boolean', { default: false })
    text_size: boolean

    @Column('boolean', { default: false })
    text_spacing: boolean

    @Column('boolean', { default: false })
    high_visibility: boolean

    @Column('boolean', { default: false })
    fontDyslexic: boolean

    @OneToMany(()=> UserEntity, (user)=> user.config)
    user: UserEntity[]
}
