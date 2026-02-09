import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { DataDownloadService } from './data-download.service';
import { ICM_A_DataDownload } from 'src/entities/ICM_A_DataDownload';
import { NavigationExhSaveDto } from 'src/common/dto/exhibits-Img-list.dto';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.download)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/download')
export class DataDownloadController {
    constructor(
        private dataDownloadService: DataDownloadService
    ) { }


    @Get('list/:mediaType')
    async findAll(@Res() res: any, @Param('mediaType') mediaType: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.dataDownloadService.findAll(mediaType))
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.dataDownloadService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_DataDownload, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.dataDownloadService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_DataDownload, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.dataDownloadService.saveOne(body))
    }
   
    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.dataDownloadService.remove(id))
    }

}
