import { UserDto } from './user-dto/user-dto';
import { Repository } from 'typeorm';
import { ConfigDto } from 'src/configurations/config-dto/config-dto';
export declare class UsersService {
    private userRepo;
    private request;
    constructor(userRepo: Repository<UserDto>, request: any);
    getAll(sortBy: string, filterBy: any): Promise<UserDto[]>;
    getAllWithRelations(sortBy: string, filterBy: any): Promise<UserDto[]>;
    getOne(id: string): Promise<UserDto>;
    getOneWithRelations(id: string): Promise<UserDto>;
    updateSuperuserRole(id: string, user: Partial<UserDto>): Promise<UserDto>;
    updateUserInfo(user: Partial<UserDto>): Promise<UserDto>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
    register(user: UserDto, config: ConfigDto): Promise<UserDto>;
    login(username: string): Promise<UserDto>;
}
