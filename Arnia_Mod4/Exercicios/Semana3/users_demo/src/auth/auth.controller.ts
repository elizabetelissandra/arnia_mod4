import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDoc } from './docs/login.doc';
import { TokenDoc } from './docs/token.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({type: LoginDoc})
  @ApiResponse({type: TokenDoc})
  @Get('login')
  async login(@Body() body: CreateUserDto){
    return await this.authService.login(body)
  }
}
