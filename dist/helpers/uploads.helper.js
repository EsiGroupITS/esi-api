"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.saveImageToStorage = void 0;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
const validFileExtension = ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
const validMimeType = ['image/png', 'image/jpg', 'image/jpeg', 'application/msword', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
exports.saveImageToStorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, callback) => {
            const fileExtension = path.extname(file.originalname);
            const filename = (0, uuid_1.v4)() + fileExtension;
            callback(null, filename);
        },
    }),
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = validMimeType;
        allowedMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false);
    }
};
const removeFile = (fullFilePath) => {
    try {
        fs.unlinkSync(fullFilePath);
    }
    catch (e) {
        console.log(e);
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=uploads.helper.js.map