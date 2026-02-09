import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';

import { ICM_A_Navigation } from 'src/entities/ICM_A_Navigation';
import { NavigationService } from './navigation.service';
import { NavigationExhSaveDto } from 'src/common/dto/exhibits-Img-list.dto';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.navigation)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/navigation')
export class NavigationController {
    constructor(
        private navigationService: NavigationService
    ) { }

    @Get('list')
    async findAll(@Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.navigationService.findAll())
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.navigationService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_Navigation, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.navigationService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_Navigation, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.navigationService.saveOne(body))
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.navigationService.remove(id))
    }

    @Get('exhList/:id')
    async exhList(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.navigationService.findExhList(id))
    }

    @Post('exhList/:id')
    async exhListSave(@Res() res: any, @Req() req: any, @Param('id') id: number, @Body() body: NavigationExhSaveDto) {
        return res.status(HttpStatus.OK).json(await this.navigationService.ExhListSave(id, body))
    }
}
