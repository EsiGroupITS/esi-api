import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Put, Res, UseGuards } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { Response } from 'express'
import { ConfigDto } from './config-dto/config-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';

@UseGuards(AuthGuard, RoleGuard)
@Role(RoleEnum.Superuser, RoleEnum.User, RoleEnum.Admin)
@Controller('configurations')
export class ConfigurationsController {
    constructor(private configService: ConfigurationsService) {}

    @Get()
    async getAll(@Body() body: any, @Res() res: Response) {
        const result = await this.configService.getAll(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get('users')
    async getAllWithRelations(@Body() body: any, @Res() res: Response) {
        const result = await this.configService.getAllWithRelations(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Put(':id')
    async update(@Body() config: Partial<ConfigDto>, @Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
        const result = await this.configService.update(id, config)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
        const result = await this.configService.delete(id)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
}
