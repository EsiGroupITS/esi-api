import { Controller, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/helpers/uploads.helper';
import { of } from 'rxjs';

@Controller('uploads')
export class UploadsController {
    constructor(
        private uploadService: UploadsService
    ) {  }

    @Post()
    @UseInterceptors(FilesInterceptor('file', null, saveImageToStorage))
    insertMultipleFiles(@UploadedFiles() file: Array<Express.Multer.File>) {
        const filesName = []
        file.forEach(x => {
            filesName.push(x.filename)
        })
        return filesName
    }
    @Post()
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    insertFile(){return}

    @Put(':name')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    async update(@UploadedFile() file: Express.Multer.File, @Param('name') name: string) {
        await this.uploadService.removeFile(name)
        if(!file) return of({error: 'File extension not supported'})
        return file.filename
    }
}
