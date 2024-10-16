import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/entities/Events';
import { UsersModule } from 'src/users/users.module';
import { EventPhotos } from 'src/entities/EventPhotos';

@Module({
  imports: [TypeOrmModule.forFeature([Events, EventPhotos]), UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
