import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDoc{
    @ApiProperty({description: 'Name of event', example: 'Comemoração de abertura da nova sede', type: String, title: 'Event Name'})
    eventName: string

    @ApiProperty({description: 'Date of event', example: '02/11/2024', type: Date, title: 'Event Date' })
    eventDate: Date;
}