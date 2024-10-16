import { ApiProperty } from "@nestjs/swagger"
import { PetDoc } from "./pet.doc"

export class ResponseGetPetDoc{
    @ApiProperty({description: 'page that is displayed', type: Number, example: 2, title: 'Page'})
    page: Number

@ApiProperty({description: 'number of pets on display', type: Number, example: 2, title: 'Limit'})
    limit: Number

@ApiProperty({description: 'total of pets on display', type: Number, example: 2, title: 'Total'})
    total: Number

@ApiProperty({description: 'pets on display', type: [PetDoc], example:{
    "id": 3,
    "name": "Billy",
    "age": 7,
    "breed": "vira-lata"
},
 title: 'Data' })
    data: PetDoc


}