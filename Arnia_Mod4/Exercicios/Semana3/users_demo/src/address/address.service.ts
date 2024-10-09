import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/Address';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { UpdateAddressDto } from './dtos/UpdateAddress.dto';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private userService: UsersService,
  ) {}

  async newAddress(body: CreateAddressDto, req: Request) {
    try {
      const { userId } = req['user'];

      const user = await this.userService.findBy(userId);

      if (user.address) {
        throw new BadRequestException('You already have a registered address.');
      }

      const address = this.addressRepository.create({
        ...body,
        user: user,
      });

      await this.addressRepository.save(address);

      return address;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
  async update(id: number, req: Request, body: UpdateAddressDto) {
    try {
      const {userId} = req['user']

      const user = await this.userService.findBy(userId)

      const address = await this.addressRepository.findOne({ where: { id } });

      if (!address) {
        throw new NotFoundException(`The Address with id: ${id} not found!`);
      }

      const addressModified = Object.assign(address, body);

      await this.addressRepository.save(addressModified);

      return addressModified;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    return this.addressRepository.find();
  }
}
