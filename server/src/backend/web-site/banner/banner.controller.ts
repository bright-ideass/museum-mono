import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { BannerService } from './banner.service';
import { ICM_A_WebBanner } from 'src/entities/ICM_A_WebBanner';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';
@HasRoles(RoleEnum.banner)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/banner')
export class BannerController {
    constructor(
        private bannerService: BannerService
    ) { }

    @Get('list/:lang')
    async findAll(@Res() res: any, @Param('lang') lang: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.bannerService.findAll(lang))
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bannerService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_WebBanner, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.bannerService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_WebBanner, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.bannerService.saveOne(body))
    }

    @Post('sort')
    async sort(@Res() res: any, @Body() body: ICM_A_WebBanner[]) {
        return res.status(HttpStatus.OK).json(await this.bannerService.sort(body));
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.bannerService.remove(id))
    }
}
