import { ApiProperty } from "@nestjs/swagger"

export class CreatePetDoc{
    @ApiProperty({description: 'pet name', type: String, example: 'luma', title: 'Name'})
    name: string

    @ApiProperty({description: 'pet age', type: Number, example: 5, title: 'Age'})
    age: number

    @ApiProperty({description: 'pet breed', type: String, example: 'Poodle', title: 'Breed'})
    breed: string
}