import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDto } from 'src/users/user-dto/user-dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/users/user-dto/auth.login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: UserDto })
    @ApiResponse({ status: 400, description: 'No params'})
    @ApiResponse({ status: 404, description: 'User not found'})
    @ApiResponse({ status: 401, description: 'Incorrect password'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
        description: 'User login',
        type: AuthLoginDto,
    })
    async login(@Body() signIn: AuthLoginDto, @Res() res: Response) {
        console.log(signIn, signIn.username);
        
        if(!signIn.username || signIn.pass == undefined){
            throw new HttpException('No params', HttpStatus.BAD_REQUEST)
        }
        const user = await this.authService.login(signIn.username, signIn.pass)
        res.status(HttpStatus.OK).json({
            ok: true,
            user,
            msg: 'Logged'
        })
    }

    @Post('register')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created', type: UserDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    async register(@Body() user: UserDto, @Res() res: Response) {
        const n_user = await this.authService.register(user)
        res.status(HttpStatus.CREATED).json({
            ok: true,
            n_user,
            msg: 'CREATED'
        })
    }
}
