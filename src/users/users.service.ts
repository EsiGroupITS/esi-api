import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user-entity/user-entity';
import { UserDto } from './user-dto/user-dto';
import { Repository } from 'typeorm';
import { ConfigDto } from 'src/configurations/config-dto/config-dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserDto>,
        @Inject(REQUEST) private request //! Get context info (access token and extract information)
    ) {  }

    /**
     * @description Get all records
     * @async
     * @param filterBy string -> Query filter **optional (if not apply, send empty value) -> Filter by ID (LIKE)
     * @param sortBy string -> Query sorter **optional (if not apply, send empty value) -> send column name to sort
     * @returns Array[UserDto]
     */
    async getAll(sortBy: string, filterBy): Promise<UserDto[]> {
        try {
            const query = await this.userRepo.createQueryBuilder('users')
            if (sortBy) {
                query.orderBy(`users.${sortBy}`)
            }
            if (filterBy) {
                query.where(`users.id LIKE %${filterBy}%`)
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
     * @returns Array[UserDto{ConfigDto}]
     */
    async getAllWithRelations(sortBy: string, filterBy): Promise<UserDto[]> {
        try {
            const query = await this.userRepo.createQueryBuilder('users')
            if (sortBy) {
                query.orderBy(`users.${sortBy}`)
            }
            if (filterBy) {
                query.where(`users.id LIKE %${filterBy}%`)
            }
            query.leftJoinAndSelect('users.config', 'configurations')
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
     * @returns Object type UserDto
     */
    async getOne(id: string): Promise<UserDto> {
        if (!id) throw new BadRequestException('Invalid ID parameter')
        try {
            const result = await this.userRepo.findOne({
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
     * @returns Object type UserDto{ConfigDto}
     */
    async getOneWithRelations(id: string): Promise<UserDto> {
        if (!id) throw new BadRequestException('Invalid ID parameter')
        try {
            const result = await this.userRepo.findOne({
                relations: {
                    config: true
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
     * @description Update entity type UserDto. Send id params and partial object of UserDto - Uses only for Superusers
     * @async
     * @param id UserDto id -> type UUID
     * @param user Partial<UserDto>
     * @returns Object type UserDto (updated) 
     */
    async updateSuperuserRole(id: string, user: Partial<UserDto>) {
        try {
            const entity = await this.userRepo.findOne({where:{id}})
            if (!entity) throw new NotFoundException('Not Found')
            const merge_entity = this.userRepo.merge(entity, user)
            const result = this.userRepo.save(merge_entity)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Update entity type UserDto. If user is correctly login, can update his information
     * @async
     * @param id UserDto id -> type UUID
     * @param user Partial<UserDto>
     * @returns Object type UserDto (updated) 
     */
    async updateUserInfo(user: Partial<UserDto>) {
        try {
            const user_data_token = this.request.user //! Get user info (destructuring token)
            const data = await this.userRepo.findOne({where:{username: user_data_token.username}})
            if (!data) throw new BadRequestException('No Info Available')
            const merge_entity = this.userRepo.merge(data, user)
            const result = this.userRepo.save(merge_entity)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @description Delete one record.
     * @async
     * @param id UserDto id -> type UUID
     * @returns row change
     */
    async delete(id: string) {
        if (!id) throw new BadRequestException('Invalid ID parameter')
        try {
            const entity = this.userRepo.findOne({where:{id}})
            if (!entity) throw new NotFoundException('Not Found')
            const result = this.userRepo.delete(id)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    //!--------------------- Auth Service -----------------------
    /**
     * @description Register new user.
     * @async
     * @param user Object type UserDto 
     * @param config Object type UserDto
     * @returns new UserDto{ConfigDto}
     */
    async register(user: UserDto, config: ConfigDto) {
        try {
            const search = await this.userRepo.findOne({
                where: {
                    username: user.username
                }
            })
            if (search) throw new HttpException(`Username ${user.username} already taken`, HttpStatus.CONFLICT)
            const new_user = this.userRepo.create(user)
            new_user.config = config
            const result = await this.userRepo.save(new_user)
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    /**
     * @async
     * @param username type string
     * @returns User data
     */
    async login(username: string) {
        try {
            const result = await this.userRepo.findOne({where:{username}})
            return result
        }
        catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    //!--------------------- Auth Service -----------------------
}
