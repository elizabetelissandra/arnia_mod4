import { ApiProperty } from '@nestjs/swagger';

export class LoginDoc {
  @ApiProperty({
    description: 'user email',
    type: String,
    example: 'eliza2@email.com',
    title: 'E-mail',
  })
  email: string;

  @ApiProperty({
    description: 'password user',
    type: String,
    example: '1234',
    title: 'Password',
  })
  password: string;
}
