import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { LawService } from './law.service';
import { ICM_A_Law } from 'src/entities/ICM_A_Law';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.low)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/law')
export class LawController {
    constructor(
        private lawService: LawService
    ) { }

    @Get('list/:lang')
    async findAll(@Res() res: any, @Param('lang') lang: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.lawService.findAll(lang))
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.lawService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_Law, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.lawService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_Law, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.lawService.saveOne(body))
    }

    @Post('sort')
    async sort(@Res() res: any, @Body() body: ICM_A_Law[]) {
        return res.status(HttpStatus.OK).json(await this.lawService.sort(body));
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.lawService.remove(id))
    }
}
