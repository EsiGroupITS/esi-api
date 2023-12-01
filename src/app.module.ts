import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import dbConfig from './config/config';
import { ConfigurationsModule } from './configurations/configurations.module';
import { GamesModule } from './games/games.module';
import { QuestionsModule } from './questions/questions.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'uploads')}), //! Manages file uploads path
    ConfigModule.forRoot(), //! Configuration module
    TypeOrmModule.forRoot(dbConfig),
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
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
