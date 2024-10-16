import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/createEventDto';
import { UserParam } from 'src/auth/decorator/user.decorator';
import { User } from 'src/entities/User';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { UpdateAddressDto } from 'src/address/dtos/UpdateAddress.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDoc } from './docs/createEvent.doc';
import { EventDoc } from './docs/Event.doc';
import { UpdateAddressDoc } from 'src/address/docs/updateAddress.doc';
import { EventPhotoDoc } from './docs/eventPhoto.doc';
import { FileUploadDoc } from './docs/fileUpload.doc';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  
  @ApiBody({type: CreateEventDoc})
  @ApiResponse({type: EventDoc})
  @Post()
  async newEvent(@Body() body: CreateEventDto) {
    
    return await this.eventsService.newEvent(body);
  }
  
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const [name, extension] = file.originalname.split('.');

          const newFileName = `${name}_${new Date().getTime()}.${extension}`;

          callback(null, newFileName);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
          callback(null, false);
        }

        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: 'a photo of an event', 
    type: FileUploadDoc
  })
  @ApiResponse({type: EventPhotoDoc})
  @Post(':id/uploadPhoto')
  async uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.eventsService.uploadPhoto(id, photo)
  }

  @ApiResponse({type: FileUploadDoc})
  @Get('photo/:photoName')
  async seePhoto(@Param('photoName') photoName: string, @Res() res: Response){
    res.sendFile(photoName, {root: './uploads'})
    // return await this.eventsService.seePhoto(photoName, res)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({type: Number, name: 'id', required: true, example: 5})
  @ApiResponse({type: EventDoc})
  @Post(':id/participate')
  async enterEvent(
    @Param('id', ParseIntPipe) idEvent: number,
    @UserParam() currentUser: User,
  ) {
    return await this.eventsService.enterEvent(idEvent, currentUser);
  }

  @ApiResponse({type: EventDoc})
  @ApiQuery({name: 'eventDate', required: false})
  @Get()
  async events(@Query('eventDate') eventDate?: Date) {
    return await this.eventsService.events(eventDate);
  }

  @ApiBody({type: UpdateAddressDoc})
  @ApiResponse({type: EventDoc})
  @Patch(':id')
  async editDate(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAddressDto){
    return await this.eventsService.editDate(id, body)
  }
}
