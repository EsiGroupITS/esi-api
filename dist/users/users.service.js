"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user-entity/user-entity");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
let UsersService = exports.UsersService = class UsersService {
    constructor(userRepo, request) {
        this.userRepo = userRepo;
        this.request = request;
    }
    async getAll(sortBy, filterBy) {
        try {
            const query = await this.userRepo.createQueryBuilder('users');
            if (sortBy) {
                query.orderBy(`users.${sortBy}`);
            }
            if (filterBy) {
                query.where(`users.id LIKE %${filterBy}%`);
            }
            const result = query.getMany();
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async getAllWithRelations(sortBy, filterBy) {
        try {
            const query = await this.userRepo.createQueryBuilder('users');
            if (sortBy) {
                query.orderBy(`users.${sortBy}`);
            }
            if (filterBy) {
                query.where(`users.id LIKE %${filterBy}%`);
            }
            query.leftJoinAndSelect('users.config', 'configurations');
            const result = query.getMany();
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async getOne(id) {
        if (!id)
            throw new common_1.BadRequestException('Invalid ID parameter');
        try {
            const result = await this.userRepo.findOne({
                where: {
                    id
                }
            });
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async getOneWithRelations(id) {
        if (!id)
            throw new common_1.BadRequestException('Invalid ID parameter');
        try {
            const result = await this.userRepo.findOne({
                relations: {
                    config: true
                },
                where: {
                    id
                }
            });
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async updateSuperuserRole(id, user) {
        try {
            const entity = await this.userRepo.findOne({ where: { id } });
            if (!entity)
                throw new common_1.NotFoundException('Not Found');
            const merge_entity = this.userRepo.merge(entity, user);
            const result = this.userRepo.save(merge_entity);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async updateUserInfo(user) {
        try {
            const user_data_token = this.request.user;
            const data = await this.userRepo.findOne({ where: { username: user_data_token.username } });
            if (!data)
                throw new common_1.BadRequestException('No Info Available');
            const merge_entity = this.userRepo.merge(data, user);
            const result = this.userRepo.save(merge_entity);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException('Invalid ID parameter');
        try {
            const entity = this.userRepo.findOne({ where: { id } });
            if (!entity)
                throw new common_1.NotFoundException('Not Found');
            const result = this.userRepo.delete(id);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async register(user, config) {
        try {
            const search = await this.userRepo.findOne({
                where: {
                    username: user.username
                }
            });
            if (search)
                throw new common_1.HttpException(`Username ${user.username} already taken`, common_1.HttpStatus.CONFLICT);
            const new_user = this.userRepo.create(user);
            new_user.config = config;
            const result = await this.userRepo.save(new_user);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async login(username) {
        try {
            const result = await this.userRepo.findOne({ where: { username }, relations: { config: true } });
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map