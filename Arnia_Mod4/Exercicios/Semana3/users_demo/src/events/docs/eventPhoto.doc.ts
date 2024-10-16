import { ApiProperty } from '@nestjs/swagger';
import { Events } from 'src/entities/Events';

export class EventPhotoDoc {
  @ApiProperty({
    description: 'photo event identification',
    type: Number,
    example: 9,
    title: 'Id',
  })
  id: number;
  @ApiProperty({
    description: 'photo url',
    type: String,
    example:
      'http://localhost:3001/events/photos/congresso-contra-cancer_1729004467425.png',
    title: 'Url',
  })
  url: string;
  @ApiProperty({
    description: 'id of related event',
    type: Events,
    example: {id: 5},
    title: 'Event',
  })
  event: Events;
}
