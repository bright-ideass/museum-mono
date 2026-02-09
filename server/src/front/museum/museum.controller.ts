import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { MuseumService } from './museum.service';

@Controller('museum')
export class MuseumController {
    constructor(
        private readonly museumService: MuseumService,
    ) { }

    @Get()
    getNavigationExhibits() {
        return this.museumService.Get_NavigationExhibits();
    }

    @Get('exhibits/:id')
    async getExhibits(@Res() res: any, @Param('id') id) {        
        const exh = await this.museumService.getExhibits(id);        
        return res.status(HttpStatus.OK).json(exh);
    }

    @Get('index')
    async getIndex(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.museumService.getIndex());
    }

    @Get('livelist/:id/:roomid')
    async getLiveList(@Res() res: any, @Param('id') id, @Param('roomid') roomid) {        
        return res.status(HttpStatus.OK).json(await this.museumService.getLiveList(id, roomid));
    }

    @Get('review')
    async getReview(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.museumService.getReview());
    }

    @Get('reviewlist/:id')
    async getReviewList(@Res() res: any,  @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.museumService.getReviewList(id));
    }

    @Get('speciallist/:id')
    async getSpecialList(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.museumService.getSpecialList(id));

    }

}
