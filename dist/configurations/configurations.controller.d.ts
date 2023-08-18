import { ConfigurationsService } from './configurations.service';
import { Response } from 'express';
import { ConfigDto } from './config-dto/config-dto';
export declare class ConfigurationsController {
    private configService;
    constructor(configService: ConfigurationsService);
    getAll(body: any, res: Response): Promise<void>;
    getAllWithRelations(body: any, res: Response): Promise<void>;
    update(config: Partial<ConfigDto>, id: string, res: Response): Promise<void>;
    delete(id: string, res: Response): Promise<void>;
}
