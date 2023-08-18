import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { UserDto } from './user-dto/user-dto';

@UseGuards(AuthGuard, RoleGuard) //! ------------------------------------> UNIVERSAL CONTROLLER GUARDS
@Role(RoleEnum.Admin, RoleEnum.User, RoleEnum.Superuser)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {  }

    @Get()
    async getAll(@Body() body: any, @Res() res: Response) {
        const result = await this.userService.getAll(body.sortBy, body.filterBy)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Get('config')
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
    async updateSuperuserRole(@Param('id', new ParseUUIDPipe()) id: string, user: Partial<UserDto>, @Res() res: Response) {
        const result = await this.userService.updateSuperuserRole(id, user)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Put(':id')
    async updateUserInfo(user: Partial<UserDto>, @Res() res: Response) {
        const result = await this.userService.updateUserInfo(user)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }

    @Role(RoleEnum.Superuser)  //! -------------------------------> PARTICULAR ROLE ENDPOINT
    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
        const result = await this.userService.delete(id)
        res.status(HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
}
