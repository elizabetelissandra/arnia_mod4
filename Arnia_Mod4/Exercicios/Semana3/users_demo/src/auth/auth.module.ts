import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstantes } from './constantes';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: process.env.JWT_EXPIRES}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
