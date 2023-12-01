import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {

    constructor(
        private questionService: QuestionsService
    ) {}

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Approved', type: QuestionDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async insert(@Body() question: QuestionDto, @Res() response: Response) {
        const result = await this.questionService.insert(question)
        response.status(HttpStatus.CREATED).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: QuestionDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async getAll(@Res() response: Response) {
        const result = await this.questionService.getAll()
        response.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get('category/:category')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Approved', type: QuestionDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async getByCategory(@Param('category') category: string, @Res() res: Response) {
        const result = await this.questionService.getByCategory(category)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

}
