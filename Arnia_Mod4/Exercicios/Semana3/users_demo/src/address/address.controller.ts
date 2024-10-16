import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { UpdateAddressDto } from './dtos/UpdateAddress.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAddressDoc } from './docs/createAddress.doc';
import { AddressDoc } from './docs/address.doc';
import { UpdateAddressDoc } from './docs/updateAddress.doc';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateAddressDoc })
  @ApiResponse({ type: AddressDoc })
  @UseGuards(AuthGuard)
  @Post()
  async newAddress(@Body() body: CreateAddressDto, @Req() req: Request) {
    return this.addressService.newAddress(body, req);
  }

  @Get()
  @ApiResponse({ type: AddressDoc, isArray: true })
  async findAll() {
    return this.addressService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id to be able to update the address',
    type: Number,
    example: 5,
  })
  @ApiBody({type: UpdateAddressDoc})
  @ApiResponse({status: 200, type: CreateAddressDoc})
  @ApiResponse({status: 404, type: Error, example: "The Address with id: 5 not found!"})
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() body: UpdateAddressDto,
  ) {
    return this.addressService.update(id, req, body);
  }
}
