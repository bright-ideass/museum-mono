import { Controller, Post, Res, Body, HttpStatus, Req } from '@nestjs/common';
import { LogService } from './log.service';
import { ICM_B_ExhibitsVisit } from 'src/entities/ICM_B_ExhibitsVisit';
import { ICM_B_Stastics } from 'src/entities/ICM_B_Stastics';

@Controller('log')

export class LogController {
    constructor(
        private readonly logService: LogService,
    ) { }

    @Post('exh')
    async PostExhVisite(@Res() res: any, @Body() data: ICM_B_ExhibitsVisit, @Req() req: any) {
        data.userIP = req.headers['x-forwarded-for'];
        return res.status(HttpStatus.OK).json(await this.logService.PostExhVisit(data));
    }

    @Post('stastics')
    async PostStastics(@Res() res: any, @Body() data: ICM_B_Stastics, @Req() req: any) {
        data.userIP = req.headers['x-forwarded-for'];
        return res.status(HttpStatus.OK).json(await this.logService.PostStastics(data));
    }
}
