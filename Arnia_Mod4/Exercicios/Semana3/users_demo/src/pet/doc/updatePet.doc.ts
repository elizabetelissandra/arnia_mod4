
import { PartialType } from "@nestjs/swagger";
import { CreatePetDoc } from "./createPet.doc";

export class UpdatePetDoc extends PartialType(CreatePetDoc){}