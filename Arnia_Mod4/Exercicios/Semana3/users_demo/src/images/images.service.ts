import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/Images';
import { EventsService } from 'src/events/events.service';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images) private imagesRepository: Repository<Images>,
    private eventsService: EventsService,
    private configService: ConfigService
  ) {}

  async imageEvent(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('image invalid.');
    }
    
    await this.eventsService.findOneBy(id)

   const url = `${this.configService.get('BASE_URL')}${this.configService.get('PORT')}/events/images/${file.filename}`;

   const eventImage = this.imagesRepository.create({
    imageLink: url,
    event: {id}
   })

   await this.imagesRepository.save(eventImage)
  }
}
