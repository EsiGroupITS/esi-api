import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [
    TypeOrmModule.forFeature([Game]),
    AuthModule,
    UsersModule
  ],
  exports: [
    GamesService,
    TypeOrmModule,
  ]
})
export class GamesModule {}
