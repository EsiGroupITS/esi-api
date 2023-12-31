"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationsModule = void 0;
const common_1 = require("@nestjs/common");
const configurations_controller_1 = require("./configurations.controller");
const configurations_service_1 = require("./configurations.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_entity_1 = require("./config-entity/config-entity");
let ConfigurationsModule = exports.ConfigurationsModule = class ConfigurationsModule {
};
exports.ConfigurationsModule = ConfigurationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([config_entity_1.ConfigEntity])],
        controllers: [configurations_controller_1.ConfigurationsController],
        providers: [configurations_service_1.ConfigurationsService],
        exports: [typeorm_1.TypeOrmModule, configurations_service_1.ConfigurationsService]
    })
], ConfigurationsModule);
//# sourceMappingURL=configurations.module.js.map