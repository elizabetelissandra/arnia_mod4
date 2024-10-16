import { ApiProperty } from '@nestjs/swagger';
import { EventPhotos } from '../../entities/EventPhotos';
import { Images } from '../../entities/Images';
import { User } from '../../entities/User';

export class EventDoc {
  @ApiProperty({
    description: 'Event identification',
    type: Number,
    example: 4,
    title: 'Id',
  })
  id: number;
  @ApiProperty({
    description: 'Event Name',
    type: String,
    example: 'Comemoração de abertura da nova sede',
    title: 'Event Name',
  })
  eventName: string;
  @ApiProperty({
    description: 'Event Date',
    type: Date,
    example: '2024-11-02',
    title: 'Event Name',
  })
  eventDate: Date;

  @ApiProperty({ type: [User], description: 'list of event participants' })
  participants: User[];

  @ApiProperty({ type: EventPhotos, description: 'events photo' })
  photo: EventPhotos;

  @ApiProperty({ type: Images, description: 'images related to the event' })
  image: Images;
}
