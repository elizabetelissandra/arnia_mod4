import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDoc } from './createAddress.doc';

export class AddressDoc extends CreateAddressDoc {
  @ApiProperty({
    description: 'Address identification',
    example: 2,
    type: Number,
    title: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Date of creation address',
    example: '2024-10-07T16:34:24.953Z',
    type: Date,
    title: 'Created At',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of update address',
    example: '2024-10-07T16:34:24.953Z',
    type: Date,
    title: 'Updated At',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Date of creation address',
    example: null,
    type: Date,
    title: 'Deleted At',
  })
  deleteAt: null;
}
