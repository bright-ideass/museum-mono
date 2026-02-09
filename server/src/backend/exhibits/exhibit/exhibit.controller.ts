import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param,UseGuards } from '@nestjs/common';
import { ExhibitService } from './exhibit.service';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.exhibit)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/exhibit')
export class ExhibitController {

    constructor(
        private exhibitService: ExhibitService
    ) { }

    @Get('code/:id')
    async findCodeAll(@Res() res: any, @Req() req: any, @Param('id') id: string) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.findCodeAll(id))
    }

    @Get('subCode/:id')
    async findSubCodeAll(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.findSubCodeAll(id))
    }

    @Get('list')
    async findAll(@Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.findAll())
    }

    @Get('preview/:id')
    async findPreviewOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.findPreview(id))
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_Exhibits, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_Exhibits, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.exhibitService.saveOne(body))
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.exhibitService.remove(id))
    }
}
