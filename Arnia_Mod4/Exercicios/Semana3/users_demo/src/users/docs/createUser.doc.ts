import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDoc{
    @ApiProperty({description: 'user email', type: String, example: 'eliza2@email.com', title:'E-mail'})
    email: string;

    @ApiProperty({description: 'user password', type: String, example: '1234', title: 'Password'})
    password: string;
}