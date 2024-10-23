import { ApiProperty } from "@nestjs/swagger";
import { UserDoc } from "./User.doc";
import { Pet } from "../../entities/Pet";
import { Address } from "../../entities/Address";

export class RelationUserDoc extends UserDoc{
    @ApiProperty({type: [Pet], description: 'list of Pets', example: {
        id: 6,
        name: "luma",
        age: 5,
        breed: "Poodle"
    } })
    pet: Pet

    @ApiProperty({type: Address, description: 'user address', example:
        {
            id: 16,
            street: "Rua das lobos",
            city: "Niteroi",
            zipCode: "23652-78",
        }
    })
    address: Address
}