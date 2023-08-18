import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDto } from './user-dto/user-dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAll(body: any, res: Response): Promise<void>;
    getAllWithRelations(body: any, res: Response): Promise<void>;
    updateSuperuserRole(id: string, user: Partial<UserDto>, res: Response): Promise<void>;
    updateUserInfo(user: Partial<UserDto>, res: Response): Promise<void>;
    delete(id: string, res: Response): Promise<void>;
}
