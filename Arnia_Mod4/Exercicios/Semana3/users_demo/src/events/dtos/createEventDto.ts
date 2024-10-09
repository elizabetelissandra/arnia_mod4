import { Type } from "class-transformer"
import { isDate, IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateEventDto{
    @IsString()
    @IsNotEmpty()
    eventName: string

    @Type(()=> Date)
    @IsNotEmpty()
    eventDate: Date;
}