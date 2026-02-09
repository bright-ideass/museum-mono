import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { ICM_A_QAGame } from 'src/entities/ICM_A_QAGame';
import { ICM_A_QAGameItem } from 'src/entities/ICM_A_QAGameItem';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';

@HasRoles(RoleEnum.game)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/game')
export class GameController {
    constructor(
        private gameService: GameService
    ) { }

    @Get('qa/list')
    async findAll(@Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.gameService.findAll())
    }

    @Get('qa/read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.gameService.findOne(id))
    }

    @Post('qa/create')
    async createOne(@Body() body: ICM_A_QAGame, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.gameService.saveOne(body))
    }

    @Post('qa/update')
    async updateOne(@Body() body: ICM_A_QAGame, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.gameService.saveOne(body))
    }

    @Delete('qa/delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.gameService.remove(id))
    }

    @Get('qaItem/list')
    async findAllItem(@Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.gameService.findAllItem())
    }

    @Get('qaItem/read/:id')
    async findOneItem(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.gameService.findOneItem(id))
    }

    @Post('qaItem/create')
    async createOneItem(@Body() body: ICM_A_QAGameItem, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.gameService.saveOneItem(body))
    }

    @Post('qaItem/update')
    async updateOneItem(@Body() body: ICM_A_QAGameItem, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.gameService.saveOneItem(body))
    }

    @Delete('qaItem/delete/:id')
    async removeItem(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.gameService.removeItem(id))
    }


}
