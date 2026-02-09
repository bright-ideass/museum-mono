import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { ICM_A_Link } from 'src/entities/ICM_A_Link';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.link)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/link')
export class LinkController {
    constructor(
        private linkService: LinkService
    ) { }

    @Get('list')
    async findAll(@Res() res: any, @Param('lang') lang: string, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.linkService.findAll())
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.linkService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_Link, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.linkService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_Link, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.linkService.saveOne(body))
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.linkService.remove(id))
    }
}
