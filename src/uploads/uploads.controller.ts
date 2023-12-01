import { Controller, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/helpers/uploads.helper';
import { of } from 'rxjs';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file.upload.dto';

@Controller('uploads')
@ApiTags('uploads')
export class UploadsController {
    constructor(
        private uploadService: UploadsService
    ) {  }

    @Post()
    @UseInterceptors(FilesInterceptor('file', null, saveImageToStorage))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Files',
        type: FileUploadDto,
    })
    @ApiResponse({ status: 200, description: 'Files uploaded successfully', type: [String] })
    @ApiResponse({ status: 400, description: 'File extension not supported', type: Object })
    insertMultipleFiles(@UploadedFiles() file: Array<Express.Multer.File>) {
        const filesName = []
        file.forEach(x => {
            filesName.push(x.filename)
        })
        return filesName
    }

    @Put(':name')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 200, description: 'Files updated successfully', type: [String] })
    @ApiResponse({ status: 400, description: 'File extension not supported', type: Object })
    async update(@UploadedFile() file: Express.Multer.File, @Param('name') name: string) {
        await this.uploadService.removeFile(name)
        if(!file) return of({error: 'File extension not supported'})
        return file.filename
    }
}
