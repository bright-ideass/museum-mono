import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { ICM_A_News } from 'src/entities/ICM_A_News';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.news)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/news')
export class NewsController {

    constructor(
        private newsService: NewsService
    ) { }


    @Get('list/:lang')
    async findAll(@Res() res: any, @Param('lang') lang: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.newsService.findAll(lang))
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.newsService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_News, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.newsService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_News, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.newsService.saveOne(body))
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.newsService.remove(id))
    }
}
