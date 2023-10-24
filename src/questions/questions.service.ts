import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { QuestionDto } from './dto/question.dto';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(QuestionEntity) private questionRepository: Repository<QuestionDto>
    ) {}

    async insert(question: QuestionDto): Promise<QuestionDto | undefined> {
        try {
            const entity = await this.questionRepository.findOne({ where: { question: question.question } })
            if(entity) throw new HttpException('Duplicate entry', HttpStatus.CONFLICT)
            else return await this.questionRepository.save(question)
        }
        catch (e: any) {
            throw new HttpException(`${e.name}: ${e.message}`, e.status)
        }
    }

    async getAll(): Promise<QuestionDto[]> {
        try {
            return await this.questionRepository.find()
        }
        catch(e: any) {
            throw new HttpException(`${e.name}: ${e.message}`, e.status)
        }
    }

}
