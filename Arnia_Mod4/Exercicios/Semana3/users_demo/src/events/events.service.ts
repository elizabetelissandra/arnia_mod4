import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from '../entities/Events';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateEventDto } from './dtos/createEventDto';
import { User } from 'src/entities/User';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { EventPhotos } from '../entities/EventPhotos';
import { UpdateAddressDto } from '../address/dtos/UpdateAddress.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventRepository: Repository<Events>,
    private userService: UsersService,
    private configService: ConfigService,
    @InjectRepository(EventPhotos)
    private eventPhotosRepository: Repository<EventPhotos>,
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
      const event = await this.findOneBy(id);
      console.log(event);

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
        relations: { participants: true, image: true },
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

  async events(eventDate: Date) {
    try {
      const dateEvent = eventDate
        ? await this.eventRepository.find({
            where: { eventDate: MoreThanOrEqual(eventDate) },
          })
        : await this.eventRepository.find();

      return dateEvent;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async uploadPhoto(id: number, photo: Express.Multer.File) {
    try {
      if (!photo) {
        throw new BadRequestException('photo invalid.');
      }

      await this.findOneBy(id);

      const url = `${this.configService.get('BASE_URL')}${this.configService.get('PORT')}/events/photos/${photo.filename}`;

      const eventPhoto = this.eventPhotosRepository.create({
        event: { id },
        url: url,
      });

      await this.eventPhotosRepository.save(eventPhoto);

      return eventPhoto;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async editDate(id: number, body: UpdateAddressDto){
    try {
      const event = await this.findOneBy(id)
      
      const newDate = Object.assign(event, body)

      await this.eventRepository.save(newDate)

      return newDate;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
