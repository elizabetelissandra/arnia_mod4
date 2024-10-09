import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/entities/Events';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/createEventDto';
import { User } from 'src/entities/User';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventRepository: Repository<Events>,
    private userService: UsersService,
  ) {}

  async newEvent(body: CreateEventDto) {
    try {
      const event = this.eventRepository.create(body);

      await this.eventRepository.save(event);

      return event;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async enterEvent(id: number, currentUser: User) {
    try {
      const event = await this.findOneBy(id)
      console.log(event)

      if (!event) {
        throw new NotFoundException(`Event with id: ${id} not found!`);
      }
      
      await this.userService.findBy(currentUser.id);
      

      event.participants.push({ id: currentUser.id } as User);

      await this.eventRepository.save(event);

      return await this.findOneBy(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneBy(id: number) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id },
        relations: { participants: true },
      });

      if (!event) {
        throw new NotFoundException(`An event with id: ${id} not found.`);
      }

      return event;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async events(){
    try {
        return await this.eventRepository.find()
    } catch (error) {
        console.log(error)
        throw new HttpException(error.message, error.status)
    }
  }
}
