import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dtos/createPet.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdatePetDto } from './dtos/updatePet.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePetDoc } from './doc/createPet.doc';
import { PetWithUserDoc } from './doc/petWithUser.doc';
import { ResponseGetPetDoc } from './doc/responseGet.doc';
import { UpdatePetDoc } from './doc/updatePet.doc';

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({type: CreatePetDoc})
  @ApiResponse({type: PetWithUserDoc})
  @Post()
  async newPet(@Body() body: CreatePetDto, @Req() req: Request) {
    return await this.petService.newPet(body, req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({type: PetWithUserDoc})
  @Get('mypets')
  async myPets(@Req() req: Request) {
    return await this.petService.myPets(req);
  }

  @ApiQuery({name: 'page', type: Number, required: false})
  @ApiQuery({name: 'limit', type: Number, required: false})
  @ApiQuery({name: 'breed', type: String, required: false})
  @ApiResponse({type: ResponseGetPetDoc})
  @Get()
  async allPets(@Query('page', ParseIntPipe) page = 1, @Query('limit', ParseIntPipe) limit=5,@Query('breed') breed?: string) {
    return await this.petService.allPets(page, limit, breed);
  }

  @ApiParam({name: 'id', example: 5, type: Number})
  @ApiResponse({type: PetWithUserDoc})
  @Get(':id')
  async onePet(@Param('id', ParseIntPipe) id: number) {
    return await this.petService.onePet(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({name: 'id', type: Number, example: 1})
  @ApiBody({type: UpdatePetDoc})
  @ApiResponse({type: PetWithUserDoc})
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idPet: number,
    @Req() req: Request,
    @Body() body: UpdatePetDto,
  ) {
    return await this.petService.update(idPet, req, body);
  }
}
