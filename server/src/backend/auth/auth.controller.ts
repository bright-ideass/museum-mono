import { Controller, Post, Body, Response, HttpStatus, Req, Res, Get, Session, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { differenceInSeconds } from 'date-fns'
import { adminLoginDTO } from 'src/common/dto/exhibits-Img-list.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly httpService: HttpService,
    ) { }

    @Post('login')
    async loginAdmin(@Body() body: adminLoginDTO, @Req() req: any) {
        body.Ip = req?.socket?.remoteAddress || req?.headers['x-forwarded-for'] || null;
        /*
        const qs = require('qs');
        const qsData = qs.stringify({
            'SystemId': process.env.AUTH_SYSTEM_ID,
            'RandomNo': body.RandomNo,
            'Ip': body.Ip
        });
        */
        const d = new URLSearchParams()
        d.append('SystemId', process.env.AUTH_SYSTEM_ID)
        d.append('RandomNo', body.RandomNo)
        d.append('Ip', body.Ip)
        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } };

        const auth = await firstValueFrom(this.httpService.post(process.env.AUTH_LOGIN_URL, d, config).pipe(
            catchError((error: AxiosError) => {
                console.log('Auth error happened!', error)
                throw new HttpException(`not find id`, HttpStatus.BAD_REQUEST)
            }),
        )
        )

        return await this.authService.createToken(auth.data);

    }

    @Post('logTest')
    async logTest(@Body() body: any) {
        console.log('log:', body)
        return 'ok'

    }

    @Post('authTest')
    async AuthTest(@Body() body: adminLoginDTO) {
        console.log('AuthTest:', body)
        return {
            "UserId": "16447",
            "UserName": "張＊祥",
            "SystemId": "MFK",
            "SystemName": "貨幣金融知識專區",
            "Template": "CPX",
            "LastLogin": "2021-01-08T11:51:49.54",
            "Roles": [
                "Banner", "Book", "Faq", "Low", "Link", "News", "Exhibit", "Navigation", "Download", "Game"
            ],
            "DeptName": "資訊處規劃科",
            "EngName": null,
            "DeptId": "資規劃科",
            "DeptNickName": null,
            "Timeout": 20,
            "TemplateParameter": "{\"Banner\":\"\",\"Parameter\":null}",
            "LoginResult": 0,
            "AuthSessionToken": "DBC1D42582247314AD5E37DD41D60178",
            "NextTimeout": "2021-01-08T12:14:00.6635773+08:00"
        }

    }

    @Post('menuTest')
    async menuTest(@Body() body: any) {
        console.log('menuTest:', body)
        return [
            {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "首頁Banner管理",
                "Link": "/banner",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "訊息公告管理",
                "Link": "/news",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "常見問答管理",
                "Link": "/faq",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "券幣法規管理",
                "Link": "/law",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "網網相連管理",
                "Link": "/link",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "出版品資訊管理",
                "Link": "/book",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "多媒體區管理",
                "Link": "/download",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "券幣知識王管理",
                "Link": "/qa-game",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "典藏品管理",
                "Link": "/exhibit",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "虛擬展覽管理",
                "Link": "/navigation",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }, {
                "Id": "ba0eeeac-7707-4a8f-a74a-b9ecef1269a7",
                "Parent": null,
                "Name": "LOG操作紀錄",
                "Link": "/logs",
                "Order": 5,
                "Parameter": "{\"MenuParameter\":null}",
                "Visable": true,
                "NewTab": false,
                "MenuAuthToken": "YPMULwZUf5dMlHF8BiGAr6BfawsRkeqnKLZtq1dQHl//l82chwez04Qr/8E8zgSC3koPVqP/ap3Am01VEn9ZDfzCX6eXZx1M64OypMhs7+o3UjWogt0VAcEj+OLy/pibQuUiJe669qm3m85w9daxLHxM+1baJ33qcoFZqbYrVyEbhrQ1A/ZnMkXNGJXBgdI8AOaNEWerq0+t9Ql97NJdIw=="
            }
        ]
    }
}