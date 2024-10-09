import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAddressDto{
  @IsString()
  @IsNotEmpty()  
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;
}