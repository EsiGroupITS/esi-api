import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationsModule } from './configurations/configurations.module';
import { UserEntity } from './users/user-entity/user-entity';
import { ConfigEntity } from './configurations/config-entity/config-entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadsModule } from './uploads/uploads.module';
import { GamesModule } from './games/games.module';
import { CommonModule } from './common/common.module';
import { ParticipationsModule } from './participations/participations.module';
import { Game } from './games/entities/game.entity';
import { Participation } from './participations/entities/participation.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'uploads')}), //! Manages file uploads path
    ConfigModule.forRoot(), //! Configuration module
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DATABASE,
      username: 'root',
      password: process.env.PASSWORD,
      port: +process.env.PORT,
      host: process.env.HOST,
      entities: [
        /* Entities */
        UserEntity,
        ConfigEntity,
        Game,
        Participation
      ],
      autoLoadEntities: true,
      synchronize: true
    }),
    JwtModule.register({ //! Json Web Token module configurations
      global: true,
      secret: process.env.SEED,
      signOptions: { expiresIn: '10000h' }
    }),

    /* Internal modules */
    ConfigurationsModule,
    UsersModule,
    AuthModule,
    UploadsModule,
    GamesModule,
    CommonModule,
    ParticipationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
