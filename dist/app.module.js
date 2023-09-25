"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const configurations_module_1 = require("./configurations/configurations.module");
const user_entity_1 = require("./users/user-entity/user-entity");
const config_entity_1 = require("./configurations/config-entity/config-entity");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const uploads_module_1 = require("./uploads/uploads.module");
const games_module_1 = require("./games/games.module");
const common_module_1 = require("./common/common.module");
const participations_module_1 = require("./participations/participations.module");
const game_entity_1 = require("./games/entities/game.entity");
const participation_entity_1 = require("./participations/entities/participation.entity");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({ rootPath: (0, path_1.join)(__dirname, '..', 'uploads') }),
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                database: process.env.DATABASE,
                username: 'root',
                password: process.env.PASSWORD,
                port: +process.env.PORT,
                host: process.env.HOST,
                entities: [
                    user_entity_1.UserEntity,
                    config_entity_1.ConfigEntity,
                    game_entity_1.Game,
                    participation_entity_1.Participation
                ],
                autoLoadEntities: true,
                synchronize: true
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.SEED,
                signOptions: { expiresIn: '10000h' }
            }),
            configurations_module_1.ConfigurationsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            uploads_module_1.UploadsModule,
            games_module_1.GamesModule,
            common_module_1.CommonModule,
            participations_module_1.ParticipationsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map