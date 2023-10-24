import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('questions')
export class QuestionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 100 })
    category: string

    @Column('text')
    question: string

    @Column('text')
    answers: string

    @Column('text')
    correct_answer: string
}