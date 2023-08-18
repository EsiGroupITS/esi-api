import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigurationsModule } from 'src/configurations/configurations.module';

@Module({
  imports: [UsersModule, ConfigurationsModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
