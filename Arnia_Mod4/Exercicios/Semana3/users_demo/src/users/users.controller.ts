import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import  { AuthGuard }  from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() body: CreateUserDto) {
      return await this.usersService.create(body);
    }
    
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Query('is_active') is_active?: string  ){
      const isActiveBool = is_active === 'true' ? true: is_active === 'false' ? false: undefined;
      return await this.usersService.findAll(isActiveBool)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Req() request: Request){
      return await this.usersService.profile(request)
    }

    @Get(':id')
    async findBy(@Param('id', ParseIntPipe) id: number){
      return await this.usersService.findBy(id)
    }

   

    @Patch(':id')
    async updateBy(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto){
      return await this.usersService.updateBy(id, body)
    }

    @Delete(':id')
    async deleteBy(@Param('id', ParseIntPipe) id:number){
      return await this.usersService.deleteBy(id)
    }

    
}
