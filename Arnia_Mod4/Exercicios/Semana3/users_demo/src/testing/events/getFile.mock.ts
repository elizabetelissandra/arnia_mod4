import { getFileFromBuffer } from "./getFileFromBuffer"
import { join } from "path"

export const getFileMock = async () => {
    const {buffer, stream} = await getFileFromBuffer(join(__dirname, 'eventos.jpg'),)  

    const photo: Express.Multer.File = {
         filename:'events' ,
         destination:'/uploads' ,
         originalname: 'eventos',
         fieldname:'jpg' ,
         mimetype:'testing' ,
         size: 150,
         path:'./eventos.jpg' ,
         buffer,
         stream,
         encoding: 'testing',
    }

    return photo
}