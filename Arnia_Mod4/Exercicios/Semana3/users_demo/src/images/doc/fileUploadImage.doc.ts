import { ApiProperty } from "@nestjs/swagger";

export class fileUploadImageDoc{
    
        @ApiProperty({type: 'string', format: 'binary'})
        image: any
    }