import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet } from 'src/entities/Pet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet
    ]), UsersModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
