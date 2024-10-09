import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { PetModule } from './pet/pet.module';



@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AddressModule,
    PetModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
