import { Controller, Get, Res, Param, HttpStatus, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionColtroller {
    constructor(
        private readonly collectionService: CollectionService,
    ) { }

    @Get('list/:id')  // 券幣介紹 展件列表
    async getStory(@Res() res: any, @Param('id') id, @Query() query) {        
        return res.status(HttpStatus.OK).json(await this.collectionService.getCollectionList(id, query.skip, query.plateyear, query.name));
    }

    @Get('subcode')
    async getSubCode(@Res() res: any) {
        return res.status(HttpStatus.OK).json(await this.collectionService.getSubCode());
    }

    @Get('subcode/:id')
    async getSubCodeName(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.collectionService.getSubCodeName(id));
    }

    @Get('info/:id')
    async getExhibits(@Res() res: any, @Param('id') id) {
        return res.status(HttpStatus.OK).json(await this.collectionService.getExhibits(id));
    }

    @Get('search')
    async getSearch(@Res() res: any, @Query() query) {
        // console.log(query);
        return res.status(HttpStatus.OK).json(await this.collectionService.getSearch(query.skip, query.keyword, query.Periodid, query.type));
    }

    @Get('testlist/:id')  // 券幣介紹 展件列表
    async gettestStory(@Res() res: any, @Param('id') id, @Query() query) {
        return res.status(HttpStatus.OK).json(await this.collectionService.getTeseList(id, query.skip, query.plateyear, query.name));
    }

}
