import { Module } from '@nestjs/common';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationsService } from './configurations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from './config-entity/config-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity])],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  exports: [TypeOrmModule, ConfigurationsService]
})
export class ConfigurationsModule {}
