import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from './config-entity/config-entity';
import { Repository } from 'typeorm';
import { ConfigDto } from './config-dto/config-dto';

@Injectable()
export class ConfigurationsService {
    constructor(@InjectRepository(ConfigEntity) private configRepo: Repository<ConfigDto>) {  }

    /**
     * @description Insert one record. First insert one User record.
     * @async
     * @param config Object type ConfigDto
     * @returns new ConfigDto{UserDto}
     */
    async insert(config: ConfigDto) {
        try {
            const new_config = this.configRepo.create(config)
            const result = await this.configRepo.save(new_config)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Get all records
     * @async
     * @param filterBy string -> Query filter **optional (if not apply, send empty value) -> Filter by ID (LIKE)
     * @param sortBy string -> Query sorter **optional (if not apply, send empty value) -> send column name to sort
     * @returns Array[ConfigDto]
     */
    async getAll(sortBy: string, filterBy): Promise<ConfigDto[]> {
        try {
            const query = await this.configRepo.createQueryBuilder('configurations')
            if (sortBy) {
                query.orderBy(`configurations.${sortBy}`)
            }
            if (filterBy) {
                query.where(`configurations.id LIKE %${filterBy}%`)
            }
            const result = query.getMany()
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Get all record and his relational entities
     * @async
     * @param filterBy string -> Query filter **optional (if not apply, send empty value) -> Filter by ID (LIKE)
     * @param sortBy string -> Query sorter **optional (if not apply, send empty value) -> send column name to sort
     * @returns Array[ConfigDto{UserDto}]
     */
    async getAllWithRelations(sortBy: string, filterBy): Promise<ConfigDto[]> {
        try {
            const query = await this.configRepo.createQueryBuilder('configurations')
            if (sortBy) {
                query.orderBy(`configurations.${sortBy}`)
            }
            if (filterBy) {
                query.where(`configurations.id LIKE %${filterBy}%`)
            }
            query.leftJoinAndSelect('configurations.user', 'user')
            const result = query.getMany()
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Get one record
     * @async
     * @param id type string -> Get UUID
     * @returns Object type ConfigDto
     */
    async getOne(id: string): Promise<ConfigDto> {
        if (!id) throw new BadRequestException('Invalid ID parameter')
        try {
            const result = await this.configRepo.findOne({
                where: {
                    id
                }
            })
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Get one record and his relational entities
     * @async
     * @param id type string -> Get UUID
     * @returns Object type ConfigDto{UserDto}
     */
    async getOneWithRelations(id: string): Promise<ConfigDto> {
        if (!id) throw new BadRequestException('Invalid ID parameter')
        try {
            const result = await this.configRepo.findOne({
                relations: {
                    user: true
                },
                where: {
                    id
                }
            })
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Update entity type ConfigDto. Send id params and partial object of ConfigDto
     * @async
     * @param id ConfigDto id -> type UUID
     * @param config Partial<ConfigDto>
     * @returns Object type ConfigDto (updated) 
     */
    async update(id: string, config: Partial<ConfigDto>) {
        try {
            const entity = await this.configRepo.findOne({where:{id}})
            if (!entity) throw new NotFoundException('Not Found')
            const merge_entity = this.configRepo.merge(entity, config)
            const result = this.configRepo.save(merge_entity)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Delete one record.
     * @async
     * @param id ConfigDto id -> type UUID
     * @returns row change
     */
    async delete(id: string) {
        if (!id) throw new BadRequestException('Invalid ID parameter')
        try {
            const entity = this.configRepo.findOne({where:{id}})
            if (!entity) throw new NotFoundException('Not Found')
            const result = this.configRepo.delete(id)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }
}
