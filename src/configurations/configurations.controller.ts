import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Put, Res, UseGuards } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { Response } from 'express'
import { ConfigDto } from './config-dto/config-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UserDto } from 'src/users/user-dto/user-dto';

@UseGuards(AuthGuard, RoleGuard)
@Role(RoleEnum.Superuser, RoleEnum.User, RoleEnum.Admin)
@Controller('configurations')
@ApiTags('configurations')
export class ConfigurationsController {
    constructor(private configService: ConfigurationsService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: ConfigDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async getAll(@Body() body: any, @Res() res: Response) {
        const result = await this.configService.getAll(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get('users')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Approved',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConfigDto) },
                {
                properties: {
                    config: {
                            $ref: getSchemaPath(UserDto),
                        },
                    },
                },
            ],
        },
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async getAllWithRelations(@Body() body: any, @Res() res: Response) {
        const result = await this.configService.getAllWithRelations(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: ConfigDto })
    @ApiResponse({ status: 404, description: 'Not Found'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async update(
        @Body() config: Partial<ConfigDto>,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Res() res: Response
    ) {
        const result = await this.configService.update(id, config)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Approved' })
    @ApiResponse({ status: 404, description: 'Not Found'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async delete(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
        const result = await this.configService.delete(id)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
}
