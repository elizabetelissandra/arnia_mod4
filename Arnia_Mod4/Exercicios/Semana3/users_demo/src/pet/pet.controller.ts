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

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(AuthGuard)
  @Post()
  async newPet(@Body() body: CreatePetDto, @Req() req: Request) {
    return await this.petService.newPet(body, req);
  }

  @UseGuards(AuthGuard)
  @Get('mypets')
  async myPets(@Req() req: Request){
    return await this.petService.myPets(req)
  }

  @Get()
  async allPets(@Query('breed') breed?: string) {
    return await this.petService.allPets(breed);
  }

  @Get(':id')
  async onePet(@Param('id', ParseIntPipe) id: number) {
    return await this.petService.onePet(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idPet: number,
    @Req() req: Request,
    @Body() body: UpdatePetDto,
  ) {
    return await this.petService.update(idPet, req, body);
  }

  
}
