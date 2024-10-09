import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Email is not valid'})
    @IsNotEmpty({message: 'Email is required'})
    @Length(5, 50, {message: 'Email must be between 5 and 50 characters long'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    @Length(3, 255, {message: 'Password must be between 3 and 255 characters long'})
    password: string;
}