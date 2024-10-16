import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from '../entities/Images';

import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Images]), EventsModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
