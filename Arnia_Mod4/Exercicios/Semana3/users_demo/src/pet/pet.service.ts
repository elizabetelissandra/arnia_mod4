import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/entities/Pet';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dtos/createPet.dto';
import { UsersService } from 'src/users/users.service';
import { UpdatePetDto } from './dtos/updatePet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    private userService: UsersService,
  ) {}

  async newPet(body: CreatePetDto, req: Request) {
    try {
      const { id } = req['user'];

      const user = await this.userService.findBy(id);

      const pet =  this.petRepository.create({
        ...body,
        user: user,
      });

      await this.petRepository.save(pet);

      return pet;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async onePet(id: number) {
    try {
      const pet = await this.petRepository.findOne({
        where: { id },
        relations: { user: true },
      });

      if (!pet) {
        throw new NotFoundException(`Pet with this id:${id} not found.`);
      }

      return pet;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async allPets(page: number, limit: number, breed?: string) {
    try {
      const pageOptions = { skip: (page - 1) * limit, take: limit };

      const pets = breed ?
       await this.petRepository.find({ where: { breed }, 
        ...pageOptions, }) :
      await this.petRepository.find({...pageOptions});

      return {
        page,
        limit, 
        total: pets.length,
        data: pets
      }
      
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(idPet: number, req: Request, body: UpdatePetDto) {
    try {
      const pet = await this.petRepository.findOne({
        where: { id: idPet },
        relations: { user: true },
      });

      if (!pet) {
        throw new NotFoundException('Pet not found');
      }

      const { id } = req['user'];

      if (pet.user.id !== id) {
        throw new UnauthorizedException(
          'User is not authorized to update this pet.',
        );
      }

      const petModified = await this.petRepository.merge(pet, body);

      return await this.petRepository.save(petModified);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async myPets(req: Request) {
    try {
      const { id } = req['user'];

      const user = await this.userService.findBy(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const pets = await this.petRepository.find({
        where: { user: { id: user.id } },
      });
      return pets;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
