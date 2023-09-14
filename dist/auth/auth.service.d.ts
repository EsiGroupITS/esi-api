import { JwtService } from '@nestjs/jwt';
import { ConfigDto } from 'src/configurations/config-dto/config-dto';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { UserDto } from 'src/users/user-dto/user-dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private configService;
    private jwtService;
    constructor(userService: UsersService, configService: ConfigurationsService, jwtService: JwtService);
    login(username: string, pass: string): Promise<{
        access_token: string;
        user: {
            name: string;
            last_name: string;
            config: ConfigDto;
        };
    }>;
    register(user: UserDto): Promise<UserDto | undefined>;
}
