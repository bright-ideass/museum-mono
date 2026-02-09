import { Controller, Get, HttpStatus, Res, Param, Body, Req, Post } from '@nestjs/common';
import { WebService } from './web.service';


@Controller('web')

export class WebController {
    constructor(
        private readonly webService: WebService,
    ) { }

    @Get('law')  // 中文版法規
    async getLaw(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.webService.getLaw());
    }

    @Get('law/en')  // 英文版法規
    async getLaw_en(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.webService.getLaw_en());
    }

    @Get('booklist')  // 出版品資訊
    async getBookList(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.webService.getBookList());
    }

    @Get('link')  // 網網相連資訊
    async getlink(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.webService.getLink());
    }

    @Get('faq/:id')  // FAQ資訊中文版(英文)
    async getFAQ(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getFAQ(id));
    }

    @Get('datadownload/:id')  // 下載(桌布、學習單、影片)
    async getDataDownload(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getDataDownload(id));
    }

    @Get('news/:id')  // 新聞、公告訊息(中、英)
    async getNews(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getNews(id));
    }

    @Get('newspage/:id')  // 新聞、公告訊息(中、英)
    async getNewsPage(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getNewsPage(id));
    }

    @Get('circulation/:id')  // 流通券幣 展件列表
    async getCirculation(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getCirculation(id));
    }

    @Get('circulation_en/:id')  // 流通券幣(英文) 展件列表
    async getCirculation_en(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getCirculation_en(id));
    }

    @Get('commemorate/:id')  // 套幣與紀念性券幣 展件列表
    async getCommemorate(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getCommemorate(id));
    }

    @Get('commemorate_en/:id')  // 套幣與紀念性券幣(英文) 展件列表
    async getCommemorate_en(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getCommemorate_en(id));
    }

    @Get('story/:id')  // 券幣介紹 展件列表
    async getStory(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getStory(id));
    }

    @Get('story_en/:id')  // 券幣介紹(英文)展件列表
    async getStory_en(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getStory_en(id));
    }

    @Get('exhibits/:id')  // 展件內容
    async getExhibits(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getExhibits(id));
    }

    @Get('exhibits_en/:id')  // 展件內容(英文)
    async getExhibits_en(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getExhibits_en(id));
    }

    @Get('index/:id')  // 首頁(中文、英文)
    async geIndex(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.webService.getIndex(id));
    }
    /*
        @Get('feedback/:email')  // 意見信箱(查詢)
        async GetFeedback(@Res() res: any, @Param('email') email) {
            return res.status(HttpStatus.OK).json(await this.webService.GetFeedback(email));
        }
    
        @Post('feedback/')  // 意見信箱(送出)
        async PostFeedback(@Res() res: any, @Body() data: ICM_A_Feedback, @Req() req: any) {
            data.addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress.replace(/^.*:/, "");
            data.Status = 0;
            return res.status(HttpStatus.OK).json(await this.webService.PostFeedback(data));
        }
        */

    /*
    @Post('jwt')
    async jwtback(@Body() data: any) {
        console.log(data.token);
        return await this.webService.jwt(data.token);
    }*/

}
