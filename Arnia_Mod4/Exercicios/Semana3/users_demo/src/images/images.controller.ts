import { Controller, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fileUploadImageDoc } from './doc/fileUploadImage.doc';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}


  @UseInterceptors(FileInterceptor('file', {storage: diskStorage({destination: './uploads', filename(req, file, callback) {
    const [name, extension] = file.originalname.split('.')

    const newName = `${name}${new Date().getTime()}.${extension}` 

    callback(null, newName)
  },}), fileFilter(req, file, callback) {
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
      callback(null, false)
    }

    callback(null, true)
    
  },}))
  @ApiParam({name: 'id', type: Number, example: 5})
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: 'a image of an event', 
    type: fileUploadImageDoc
  })
  @ApiResponse({example: {status: 201}})
  @Post(':id/imageEvent')
  async imageEvent(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File){
    return await this.imagesService.imageEvent(id, file)
  }
}
