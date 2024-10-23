import {
  HttpException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { currentUserCopyDto } from 'src/auth/dtos/currentUser.copy.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    try {
      const NewUser = this.usersRepository.create(body);

      await this.usersRepository.save(NewUser);

      return NewUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(isActive?: boolean) {
    try {
      if (isActive !== undefined) {
        return this.usersRepository.find({ where: { isActive } });
      }
      return this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findBy(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          address: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with this id:${id} not found.`);
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async updateBy(id: number, body: UpdateUserDto) {
    try {
      await this.findBy(id);

      await this.usersRepository.update(id, body);

     return await this.usersRepository.findOneBy({id});
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteBy(id: number) {
    try {
      await this.findBy(id);

      await this.usersRepository.softDelete(id);

      return { response: 'ok' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findUser(email: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: ['id','email', 'password'], //
      });
      if (!user) {
        throw new HttpException('Usuário não encontrado', 404);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async profile(current: currentUserCopyDto) {
    try {
      return await this.findBy(current.id)

      // const { id } = request['user'];

  
      // const user =  await this.usersRepository.findOne({
      //   where: { id: id },
      //   relations: 
      //   {address: true, 
      //     pet: true
      //   }
      // });
      // return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
