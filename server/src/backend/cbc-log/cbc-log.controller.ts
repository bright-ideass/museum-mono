import { Controller, Post, Body, Get, Res, Ip, HttpStatus, Req, HttpException } from '@nestjs/common';
import { cbcLog } from 'src/entities/cbclog.entity';
import { CbcLogService } from './cbc-log.service';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService, } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Controller('backend/log')
export class CbcLogController {
    constructor(
        private cbcLogService: CbcLogService,
        private readonly httpService: HttpService,
    ) { }

    @Post('save')
    async PostLogs(@Body() body: cbcLog, @Res() res: any, @Req() req: Request) {
        let ip = req.socket.remoteAddress || req.headers['x-forwarded-for'] || null;
        body.ip = String(ip);
        await this.SaveCbcLog(body);
        return res.status(HttpStatus.OK).json(await this.cbcLogService.addCbcLog(body))
    }

    async SaveCbcLog(body: cbcLog) {
        const d = new URLSearchParams()
        d.append('Where', body.Where)
        d.append('Level', '3')
        d.append('Type', '3')
        d.append('SubType', body.SubType)
        d.append('What', body.What)
        d.append('Memo', body.Memo)

        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } };
        try {
            await firstValueFrom(
                this.httpService.post(process.env.AUTH_LOGS_URL, d, config)
                    .pipe(
                        catchError((error) => {
                            throw new Error('cbc Log internal communication error');
                        })
                    ))
        } catch (error) { console.log( error) }

    }

    @Get('logs')
    async GetLogs(@Res() res: any, @Req() req: Request) {
        return res.status(HttpStatus.OK).json(await this.cbcLogService.getCbcLog())
    }

}
