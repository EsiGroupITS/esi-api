import { JwtService } from '@nestjs/jwt';
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
    }>;
    register(user: UserDto): Promise<UserDto | undefined>;
}
