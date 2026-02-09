import { Controller, Get, Post, UseInterceptors, UploadedFile, ParseFilePipeBuilder, Response, HttpStatus, Res, Param, UploadedFiles, Delete, Body, Req } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/file/multer.config';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { FileUploadService } from './file-upload.service';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';

enum FileValidationErrors {
    UNSUPPORTED_FILE_TYPE
}

@Controller('backend/upload')
export class FileUploadController {
    constructor(
        private fileUploadService: FileUploadService
    ) { }

    @Post('image/:type')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async fileUpload(@UploadedFile() fileDate, @Res() res: any, @Param('type') type: string) {

        if (FileType.includes(type)) {
            let isPath = fileDate.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_WEB_PATH}/`, ``)
            if (type.includes('enlargeImg')) {
                isPath = fileDate.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_ENLARGE_PATH}/`, ``)
            }
            if (type.includes('thumbnailImg')) {
                isPath = fileDate.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_THUMBNAIL_PATH}/`, ``)
            }
            if (type.includes('webImg')) {
                isPath = fileDate.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_WEBIMG_PATH}/`, ``)
            }
            if (type.includes('VR_')) {
                isPath = fileDate.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_VR_PATH}/`, ``)
            }
            if (type.includes('search')) {
                isPath = fileDate.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_SEARCH_PATH}/`, ``)
            }
            return res.status(HttpStatus.OK).json(
                {
                    status: 'success',
                    file: {
                        path: isPath,
                    },
                }
            )
        }
        throw new HttpException(`file type 設定錯誤!`, HttpStatus.NOT_FOUND);
    }

    
    @Post('imgsSort')
    async sort(@Res() res: any, @Body() body: ICM_A_ExhibitsImgList[]) {
        return res.status(HttpStatus.OK).json(await this.fileUploadService.sortImgList(body));
    }

    @Post('imgsInfo')
    async imgsInfo(@Res() res: any, @Body() body: ICM_A_ExhibitsImgList) {
        return res.status(HttpStatus.OK).json(await this.fileUploadService.infoImgList(body));
    }

    @Post('imgs/:type/:exhibitsId')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async fileSearchImgUpload(@UploadedFile() fileDate, @Res() res: any, @Param('type') type: string, @Param('exhibitsId') exhibitsId: number) {

        if (type.includes('search')) {
           
            const data = await this.fileUploadService.save(fileDate, exhibitsId)
            return res.status(HttpStatus.OK).json({
                status: 'success',
                file: {
                    imgId: data.imgID,
                    ExhibitsId: data.ExhibitsId,
                    imgType: data.imgType,
                    imgName: data.imgName,
                    imgSrc: data.imgSrc,
                    sort: data.sort,
                },
            }
            )
        }
        throw new HttpException(`file type 設定錯誤!`, HttpStatus.NOT_FOUND);
    }

    @Get('imgs/:id')
    async getImgs(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.fileUploadService.findImgListAll(id))
    }



    @Delete('imgs/:id')
    async removeItem(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.fileUploadService.findImgListDelete(id))
    }
}

const FileType = ['bannerImg', 'newsImg', 'newsFile', 'bookFile1', 'bookFile2',
    'media1', 'media2', 'media3', 'media4', 'media5', 'media5',
    'studyImg', 'studyPdf', 'videoImg', 'videoFile', 'gameImg', 'gameItemImg', 'gameZip', 'gameQa', 'gameQaBk', 'enlargeImg1', 'enlargeImg2', 'thumbnailImg', 'webImg', 'eBook', 'VR_Img', 'VR_voice'
]
