import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "src/address/dtos/CreateAddress.dto";

export class UpdateEventDto extends PartialType(CreateAddressDto){

}