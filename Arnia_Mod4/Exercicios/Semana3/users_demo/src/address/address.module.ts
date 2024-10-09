import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/Address';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([Address
  ]),
  UsersModule
],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
