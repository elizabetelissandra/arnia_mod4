import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { UpdateAddressDto } from './dtos/UpdateAddress.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post()
  async newAddress(@Body() body: CreateAddressDto, @Req() req: Request){
    return this.addressService.newAddress(body, req)
  }

  @Get()
  async findAll(){
    return this.addressService.findAll()
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id:number ,@Req() req: Request, @Body() body: UpdateAddressDto){
    return this.addressService.update(id, req, body)
  }
}
