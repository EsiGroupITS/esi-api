import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { removeFile } from 'src/helpers/uploads.helper';

@Injectable()
export class UploadsService {

    async removeFile(name: string) {
        const folder = join(process.cwd(), 'uploads')
        const filePath = join(folder+'/'+name)
        await removeFile(filePath)
    }
}
