import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDoc } from "./createUser.doc";
import { Pet } from "src/entities/Pet";

export class UserDoc extends CreateUserDoc{
    @ApiProperty({description: 'user identification', type: Number, example: 7, title: 'Id'
    })
    id: number

    @ApiProperty({description: 'if the user is active', type: Boolean, example: true, title: 'Is Active'})
    isActive: boolean

    @ApiProperty({description: 'user creation date', type: Date, example: '2024-10-09T18:28:39.149Z', title: 'Created At'})
    createdAt: Date

    @ApiProperty({description: 'user updation date', type: Date, example: '2024-10-09T18:28:39.149Z', title: 'Updated At'})
    updatedAt: Date

    @ApiProperty({description: 'user deletion date', type: Date, example: null, title: 'Deleted At'})
    deleteAt: null

}