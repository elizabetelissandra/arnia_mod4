import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDoc } from './docs/createUser.doc';
import { UserDoc } from './docs/User.doc';
import { RelationUserDoc } from './docs/relationsUser.doc';
import { ResponseGetUserDoc } from './docs/responseGetUser.doc';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({ type: UserDoc })
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @ApiBearerAuth()
  @ApiResponse({ type: [UserDoc] })
  @UseGuards(AuthGuard)
  @ApiQuery({name: 'is_active', type: String, required: false})
  @Get()
  async findAll(@Query('is_active') is_active?: string) {
    const isActiveBool =
      is_active === 'true' ? true : is_active === 'false' ? false : undefined;
    return await this.usersService.findAll(isActiveBool);
  }

  @ApiBearerAuth()
  @ApiResponse({ type: RelationUserDoc })
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() request: Request) {
    return await this.usersService.profile(request);
  }

  @ApiResponse({type: RelationUserDoc})
  @Get(':id')
  async findBy(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findBy(id);
  }

  @ApiBody({type: UserDoc})
  @ApiResponse({type: RelationUserDoc})
  @Patch(':id')
  async updateBy(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.updateBy(id, body);
  }

  @ApiParam({type: Number, name: 'id'})
  @ApiResponse({type: String, example: 'ok'})
  @Delete(':id')
  async deleteBy(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteBy(id);
  }
}
