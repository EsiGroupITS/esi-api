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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const role_enum_1 = require("../auth/roles/role-enum/role-enum");
const role_decorator_1 = require("../auth/roles/role.decorator");
const role_guard_1 = require("../auth/roles/role.guard");
const config_dto_1 = require("../configurations/config-dto/config-dto");
const user_dto_1 = require("./user-dto/user-dto");
const users_service_1 = require("./users.service");
let UsersController = exports.UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll(body, res) {
        const result = await this.userService.getAll(body.sortBy, body.filterBy);
        res.status(common_1.HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        });
    }
    async getAllWithRelations(body, res) {
        const result = await this.userService.getAllWithRelations(body.sortBy, body.filterBy);
        res.status(common_1.HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        });
    }
    async updateSuperuserRole(id, user, res) {
        const result = await this.userService.updateSuperuserRole(id, user);
        res.status(common_1.HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        });
    }
    async updateUserInfo(id, user, res) {
        const result = await this.userService.updateUserInfo(user);
        res.status(common_1.HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        });
    }
    async delete(id, res) {
        const result = await this.userService.delete(id);
        res.status(common_1.HttpStatus.OK).json({
            ok: true,
            result,
            msg: 'Approved'
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Approved',
        type: user_dto_1.UserDto,
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('config'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Approved',
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(user_dto_1.UserDto) },
                {
                    properties: {
                        config: {
                            $ref: (0, swagger_1.getSchemaPath)(config_dto_1.ConfigDto),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllWithRelations", null);
__decorate([
    (0, role_decorator_1.Role)(role_enum_1.RoleEnum.Superuser),
    (0, common_1.Put)('admin/:id'),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Approved', type: user_dto_1.UserDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. No role admitted' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateSuperuserRole", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Approved',
        type: user_dto_1.UserDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserInfo", null);
__decorate([
    (0, role_decorator_1.Role)(role_enum_1.RoleEnum.Superuser),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Approved',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. No role admitted' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.RoleEnum.Admin, role_enum_1.RoleEnum.User, role_enum_1.RoleEnum.Superuser),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map