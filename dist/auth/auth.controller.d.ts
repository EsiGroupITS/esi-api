import { Response } from 'express';
import { UserDto } from 'src/users/user-dto/user-dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/users/user-dto/auth.login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(signIn: AuthLoginDto, res: Response): Promise<void>;
    register(user: UserDto, res: Response): Promise<void>;
}
