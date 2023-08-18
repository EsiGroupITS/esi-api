import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigDto } from 'src/configurations/config-dto/config-dto';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { UserDto } from 'src/users/user-dto/user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private configService: ConfigurationsService,
        private jwtService: JwtService
    ) {  }

    async login (username: string, pass: string) {
        try {
            const user = await this.userService.login(username) //! Gets the user

            if (!user) {
                throw new NotFoundException('User Not Found')
            }
            
            const hash = await bcrypt.compare(pass, user.pass)
            if (!hash) { //! Compare passwords
                throw new UnauthorizedException('Incorrect Password')
            }

            //! Generate the token for the session:
            /**
             * @return: user.id, user.username, user.role
             * @description This params are for navigational permissions inside the API.
             *              Destructuring the token, gets the information and role.
             *              More info, see role.guard.ts
             */
            const payload = { sub: user.id, username: user.username, role: user.role }

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }
        catch (e: any){
            throw new HttpException(e.response, e.status)
        }
    }

    async register (user: UserDto): Promise<UserDto | undefined> {
        try {
            const hash = await bcrypt.hash(user.pass, 10)
            //! Change property value of object
            user.pass = hash
            const config = new ConfigDto
            const new_config = await this.configService.insert(config)
            const new_user = await this.userService.register(user, new_config)
            return new_user
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }
}
