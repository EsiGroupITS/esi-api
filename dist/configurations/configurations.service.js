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
exports.ConfigurationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_entity_1 = require("./config-entity/config-entity");
const typeorm_2 = require("typeorm");
let ConfigurationsService = exports.ConfigurationsService = class ConfigurationsService {
    constructor(configRepo) {
        this.configRepo = configRepo;
    }
    async insert(config) {
        try {
            const new_config = this.configRepo.create(config);
            const result = await this.configRepo.save(new_config);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async getAll(sortBy, filterBy) {
        try {
            const query = await this.configRepo.createQueryBuilder('configurations');
            if (sortBy) {
                query.orderBy(`configurations.${sortBy}`);
            }
            if (filterBy) {
                query.where(`configurations.id LIKE %${filterBy}%`);
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
            const query = await this.configRepo.createQueryBuilder('configurations');
            if (sortBy) {
                query.orderBy(`configurations.${sortBy}`);
            }
            if (filterBy) {
                query.where(`configurations.id LIKE %${filterBy}%`);
            }
            query.leftJoinAndSelect('configurations.user', 'user');
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
            const result = await this.configRepo.findOne({
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
            const result = await this.configRepo.findOne({
                relations: {
                    user: true
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
    async update(id, config) {
        try {
            const entity = await this.configRepo.findOne({ where: { id } });
            if (!entity)
                throw new common_1.NotFoundException('Not Found');
            const merge_entity = this.configRepo.merge(entity, config);
            const result = this.configRepo.save(merge_entity);
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
            const entity = this.configRepo.findOne({ where: { id } });
            if (!entity)
                throw new common_1.NotFoundException('Not Found');
            const result = this.configRepo.delete(id);
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
};
exports.ConfigurationsService = ConfigurationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(config_entity_1.ConfigEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConfigurationsService);
//# sourceMappingURL=configurations.service.js.map