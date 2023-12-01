import { ApiProperty } from "@nestjs/swagger"

export class QuestionDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    category: string

    @ApiProperty()
    question: string

    @ApiProperty()
    answers: string

    @ApiProperty()
    correct_answer: string
}