import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';
import { Response } from 'express';

@Controller('questions')
export class QuestionsController {

    constructor(
        private questionService: QuestionsService
    ) {}

    @Post()
    async insert(@Body() question: QuestionDto, @Res() response: Response) {
        const result = await this.questionService.insert(question)
        response.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get()
    async getAll(@Res() response: Response) {
        const result = await this.questionService.getAll()
        response.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get('category/:category')
    async getByCategory(@Param('category') category: string, @Res() res: Response) {
        const result = await this.questionService.getByCategory(category)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

}
