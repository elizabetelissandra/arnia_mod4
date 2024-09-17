import { PartialType } from "@nestjs/mapped-types";
import { Customer } from "./Customer";

export class UpdateCustomer extends PartialType(Customer) {
}


