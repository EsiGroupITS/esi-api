import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Put, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { ConfigDto } from 'src/configurations/config-dto/config-dto';
import { UserDto } from './user-dto/user-dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard, RoleGuard) //! ------------------------------------> UNIVERSAL CONTROLLER GUARDS
@Role(RoleEnum.Admin, RoleEnum.User, RoleEnum.Superuser)
@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private userService: UsersService) {  }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Approved',
        type: UserDto,
        isArray: true
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async getAll(@Body() body: any, @Res() res: Response) {
        const result = await this.userService.getAll(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get('config')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Approved',
        schema: {
            allOf: [
                { $ref: getSchemaPath(UserDto) },
                {
                properties: {
                    config: {
                            $ref: getSchemaPath(ConfigDto),
                        },
                    },
                },
            ],
        },
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async getAllWithRelations(@Body() body: any, @Res() res: Response) {
        const result = await this.userService.getAllWithRelations(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Role(RoleEnum.Superuser)
    @Put('admin/:id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: UserDto })
    @ApiResponse({ status: 403, description: 'Forbidden. No role admitted'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async updateSuperuserRole(@Param('id', new ParseUUIDPipe()) id: string, user: Partial<UserDto>, @Res() res: Response) {
        const result = await this.userService.updateSuperuserRole(id, user)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Put(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Approved',
        type: UserDto,
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async updateUserInfo(@Param('id', new ParseUUIDPipe())id: string, user: Partial<UserDto>, @Res() res: Response) {
        const result = await this.userService.updateUserInfo(user)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Role(RoleEnum.Superuser)  //! -------------------------------> PARTICULAR ROLE ENDPOINT
    @Delete(':id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Approved',
    })
    @ApiResponse({ status: 403, description: 'Forbidden. No role admitted'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async delete(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
        const result = await this.userService.delete(id)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
}
