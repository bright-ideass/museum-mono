import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { FqaService } from './fqa.service';
import { ICM_A_FAQ } from 'src/entities/ICM_A_FAQ';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.faq)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/faq')
export class FqaController {
    constructor(
        private faqService: FqaService
    ) { }

    @Get('type/:lang')
    async findFaqTypeAll(@Res() res: any, @Param('lang') lang: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.faqService.findFaqType(lang))
    }

    @Get('list/:lang')
    async findAll(@Res() res: any, @Param('lang') lang: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.faqService.findAll(lang))
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.faqService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_FAQ, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.faqService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_FAQ, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.faqService.saveOne(body))
    }

    @Post('sort')
    async sort(@Res() res: any, @Body() body: ICM_A_FAQ[]) {
        return res.status(HttpStatus.OK).json(await this.faqService.sort(body));
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.faqService.remove(id))
    }
}
