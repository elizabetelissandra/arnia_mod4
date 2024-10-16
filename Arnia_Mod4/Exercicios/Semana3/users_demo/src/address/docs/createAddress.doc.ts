import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDoc {
  @ApiProperty({
    description:
      'the street or avenue that the person wants to register is described.',
    example: 'Rua das lobos',
    type: String,
    title: 'Street',
  })
  street: string;

  @ApiProperty({
    description: 'The city where the person wants to register',
    example: 'Niteroi',
    type: String,
    title: 'City',
  })
  city: string;

  @ApiProperty({
    description: 'The postal code the person wants to register',
    example: '00000-150',
    title: 'zip Code',
  })
  zipCode: string;
}
