import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('backend/menu')
export class MenuController {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    @Get('sideMenu')
    async AuthTest(@Req() req: any) {
        /*
        const qs = require('qs');
        const qsData = qs.stringify({
            'AuthSessionToken': req?.user.AuthSessionToken
        });*/
        const d = new URLSearchParams()
        d.append('AuthSessionToken', req?.user.AuthSessionToken)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } };
        const { data } = await firstValueFrom(this.httpService.post(process.env.AUTH_MENU_URL, d, config).pipe(
            catchError((error: AxiosError) => {
                console.log('Auth error happened!', error)
                throw new HttpException(`not find id`, HttpStatus.BAD_REQUEST)
            }),
        )
        )
        return data;
    }



}
