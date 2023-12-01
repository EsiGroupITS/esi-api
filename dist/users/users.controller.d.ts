import { Response } from 'express';
import { UserDto } from './user-dto/user-dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAll(body: any, res: Response): Promise<void>;
    getAllWithRelations(body: any, res: Response): Promise<void>;
    updateSuperuserRole(id: string, user: Partial<UserDto>, res: Response): Promise<void>;
    updateUserInfo(id: string, user: Partial<UserDto>, res: Response): Promise<void>;
    delete(id: string, res: Response): Promise<void>;
}
