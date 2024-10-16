import { ApiProperty } from "@nestjs/swagger";

export class UpdateEventDoc{
    @ApiProperty({description: 'Name of event', example: 'Comemoração de abertura da nova sede', type: String, title: 'Event Name', required: false})
    eventName: string

    @ApiProperty({description: 'Date of event', example: '02/11/2024', type: Date, title: 'Event Date', required: false })
    eventDate: Date;
}