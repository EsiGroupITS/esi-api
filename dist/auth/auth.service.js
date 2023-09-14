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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_dto_1 = require("../configurations/config-dto/config-dto");
const configurations_service_1 = require("../configurations/configurations.service");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, configService, jwtService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login(username, pass) {
        try {
            const user = await this.userService.login(username);
            if (!user) {
                throw new common_1.NotFoundException('User Not Found');
            }
            const hash = await bcrypt.compare(pass, user.pass);
            if (!hash) {
                throw new common_1.UnauthorizedException('Incorrect Password');
            }
            const payload = { sub: user.id, username: user.username, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
                user: { name: user.name, last_name: user.last_name, config: user.config }
            };
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    async register(user) {
        try {
            const hash = await bcrypt.hash(user.pass, 10);
            user.pass = hash;
            const config = new config_dto_1.ConfigDto;
            const new_config = await this.configService.insert(config);
            const new_user = await this.userService.register(user, new_config);
            return new_user;
        }
        catch (e) {
            throw new common_1.HttpException(e.response, e.status);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        configurations_service_1.ConfigurationsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map