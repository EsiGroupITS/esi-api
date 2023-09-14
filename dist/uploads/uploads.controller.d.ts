/// <reference types="multer" />
import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private uploadService;
    constructor(uploadService: UploadsService);
    insertMultipleFiles(file: Array<Express.Multer.File>): any[];
    insertFile(): void;
    update(file: Express.Multer.File, name: string): Promise<string | import("rxjs").Observable<{
        error: string;
    }>>;
}
