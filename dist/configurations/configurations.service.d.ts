import { Repository } from 'typeorm';
import { ConfigDto } from './config-dto/config-dto';
export declare class ConfigurationsService {
    private configRepo;
    constructor(configRepo: Repository<ConfigDto>);
    insert(config: ConfigDto): Promise<ConfigDto>;
    getAll(sortBy: string, filterBy: any): Promise<ConfigDto[]>;
    getAllWithRelations(sortBy: string, filterBy: any): Promise<ConfigDto[]>;
    getOne(id: string): Promise<ConfigDto>;
    getOneWithRelations(id: string): Promise<ConfigDto>;
    update(id: string, config: Partial<ConfigDto>): Promise<ConfigDto>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
