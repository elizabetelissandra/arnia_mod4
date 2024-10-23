import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
      ) {}

      async login(body: CreateUserDto){
        try {
            const user = await this.userService.findUser(body.email)
            
            if(!user){
                console.log(`Email ${body.email} não encontrado.`)
                throw new UnauthorizedException('Invalid credentials');
            }
            
            const isPasswordValid = bcrypt.compareSync(body.password, user.password);
            
        if (!isPasswordValid) {
            console.log(`Senha ${body.password} não encontrado.`)
            throw new UnauthorizedException('Invalid credentials');
        }

            const payload = {id: user.id, email: user.email}

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, error.status)
        }
      }
}
