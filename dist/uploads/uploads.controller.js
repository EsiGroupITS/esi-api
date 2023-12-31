"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const uploads_service_1 = require("./uploads.service");
const platform_express_1 = require("@nestjs/platform-express");
const uploads_helper_1 = require("../helpers/uploads.helper");
const rxjs_1 = require("rxjs");
const swagger_1 = require("@nestjs/swagger");
const file_upload_dto_1 = require("./dto/file.upload.dto");
let UploadsController = exports.UploadsController = class UploadsController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    insertMultipleFiles(file) {
        const filesName = [];
        file.forEach(x => {
            filesName.push(x.filename);
        });
        return filesName;
    }
    async update(file, name) {
        await this.uploadService.removeFile(name);
        if (!file)
            return (0, rxjs_1.of)({ error: 'File extension not supported' });
        return file.filename;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', null, uploads_helper_1.saveImageToStorage)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Files',
        type: file_upload_dto_1.FileUploadDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Files uploaded successfully', type: [String] }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'File extension not supported', type: Object }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "insertMultipleFiles", null);
__decorate([
    (0, common_1.Put)(':name'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', uploads_helper_1.saveImageToStorage)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Files updated successfully', type: [String] }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'File extension not supported', type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "update", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    (0, swagger_1.ApiTags)('uploads'),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map