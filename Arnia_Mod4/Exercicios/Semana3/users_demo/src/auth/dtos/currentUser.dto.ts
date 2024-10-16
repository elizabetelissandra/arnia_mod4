import { IsNumber, IsString } from "class-validator"

export class currentUserDto{
    @IsNumber()
    id: number

    @IsString()
    email:string
}