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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DATABASE,
      username: 'root',
      password: process.env.PASSWORD,
      port: +process.env.PORT,
      host: process.env.HOST,
      entities: [
        UserEntity,
        ConfigEntity
      ],
      autoLoadEntities: true,
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SEED,
      signOptions: { expiresIn: '10000h' }
    }),
    ConfigurationsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
