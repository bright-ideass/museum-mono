import { Controller, Get, Res, HttpStatus, Post, Body, Req, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { ICM_B_QAGameLeague } from 'src/entities/ICM_B_AQGameLeague';

@Controller('game')
export class GameController {
    constructor(
        private readonly gmaeService: GameService,
    ) { }

    @Get()
    async GetQAGame(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.gmaeService.GetQAGame());
    }

    @Get('league/:id')
    async GetQAGameLeague(@Res() res: any, @Param('id') id, @Query() query) {
        return res.status(HttpStatus.OK).json(await this.gmaeService.GetQAGameLeague(id, query.Grade));
    }

    @Post('league')
    async PostQAGameLeague(@Res() res: any, @Body() data: ICM_B_QAGameLeague, @Req() req: any) {
        data.userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        return res.status(HttpStatus.OK).json(await this.gmaeService.PostQAGameLeague(data));
    }
}