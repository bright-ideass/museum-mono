import { HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { format, startOfDay } from 'date-fns'

export const multerOptions = {
    limit: { fileSize: +process.env.MAX_FILE_SIZE },
    fileFilter: (req: any, file: any, cb: any) => {
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        if (file.mimetype.match('image.*|application.pdf|application.ven|video.*|application.msword|application/x-zip|application/zip')) {
            cb(null, true);
        } else {
            cb(
                new HttpException({
                    status: 'error',
                    message: `不支持上傳此文件類型：${extname(file.originalname)}, mimetype:${file.mimetype}`,
                }, HttpStatus.UNPROCESSABLE_ENTITY), false);
        }
    },
    storage: diskStorage({
        destination: (req, file, cb) => {
            let uploadPath = process.env.FILE_UPLOAD_WEB_PATH;
            if (req.params?.type.includes('enlargeImg')) {
                uploadPath = process.env.FILE_UPLOAD_ENLARGE_PATH;
            }

            if (req.params?.type.includes('thumbnailImg')) {
                uploadPath = process.env.FILE_UPLOAD_THUMBNAIL_PATH;
            }

            if (req.params?.type.includes('webImg')) {
                uploadPath = process.env.FILE_UPLOAD_WEBIMG_PATH;
            }

            if (req.params?.type.includes('VR_')) {
                uploadPath = process.env.FILE_UPLOAD_VR_PATH;
            }

            if (req.params?.type.includes('search')) {
                uploadPath = process.env.FILE_UPLOAD_SEARCH_PATH;
            }
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            // console.log(req.params.type)
            cb(null, `${req.params.type + '_' + format(new Date(), 'yyyyMMddHHmmss')}${extname(file.originalname)}`);
        },
    }),
};



