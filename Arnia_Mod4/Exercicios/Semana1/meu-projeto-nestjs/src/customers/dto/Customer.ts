import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Customer {
    @IsNumber()
    id: number;

    @IsString({message: 'Precisa ser uma string'})
    @IsNotEmpty({message: 'Precisa ser preenchido'})
    firstName: string;

    @IsString({message: 'Precisa ser uma string'})
    @IsNotEmpty({message: 'Precisa ser preenchido'})
    lastName: string;

    @IsInt({message: 'Precisa ser um inteiro'})
    @IsNotEmpty({message: 'Precisa ser preenchido'})
    age: number;
}
