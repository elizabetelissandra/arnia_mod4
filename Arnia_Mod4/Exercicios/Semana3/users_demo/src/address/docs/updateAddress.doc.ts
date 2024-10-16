
import { CreateAddressDoc } from "./createAddress.doc";
import { PartialType } from "@nestjs/swagger";

export class UpdateAddressDoc extends PartialType(CreateAddressDoc){
}