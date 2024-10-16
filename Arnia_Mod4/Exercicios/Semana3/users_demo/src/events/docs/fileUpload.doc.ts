import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDoc{
    @ApiProperty({type: 'string', format: 'binary'})
    photo: any
}