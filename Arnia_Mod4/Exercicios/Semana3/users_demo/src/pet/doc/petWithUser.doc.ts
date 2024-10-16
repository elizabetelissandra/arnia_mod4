import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/entities/User"
import { PetDoc } from "./pet.doc"

export class PetWithUserDoc extends PetDoc{
    @ApiProperty({description: 'pet owner user', type: User, example: {
		"id": 1,
		"email": "teste@gmail.com",
		"isActive": true,
		"createdAt": "2024-10-02T14:16:02.117Z",
		"updatedAt": "2024-10-02T16:45:52.944Z",
		"deletedAt": null
	}, title: 'User'})
    user: User
}