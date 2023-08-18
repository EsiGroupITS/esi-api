import { UserDto } from 'src/users/user-dto/user-dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(signIn: any, res: Response): Promise<void>;
    register(user: UserDto, res: Response): Promise<void>;
}
