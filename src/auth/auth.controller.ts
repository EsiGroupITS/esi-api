import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDto } from 'src/users/user-dto/user-dto';
import { AuthService } from './auth.service';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() signIn: any, @Res() res: Response) {
        
        if(!signIn.username || signIn.pass == undefined){
            throw new HttpException('No params', HttpStatus.BAD_REQUEST)
        }

        const token = await this.authService.login(signIn.username, signIn.pass)

        res.status(HttpStatus.OK).json({
            ok: true,
            token,
            msg: 'Logged'
        })
    }

    @Post('register')
    async register(@Body() user: UserDto, @Res() res: Response) {
        const n_user = await this.authService.register(user)
        res.status(HttpStatus.CREATED).json({
            ok: true,
            n_user,
            msg: 'CREATED'
        })
    }
}
