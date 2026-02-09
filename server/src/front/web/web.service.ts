
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICM_A_Law } from 'src/entities/ICM_A_Law';
import { Repository, Brackets } from 'typeorm';
import { ICM_A_LawDetail } from 'src/entities/ICM_A_LawDetail';
import { ICM_A_Book } from 'src/entities/ICM_A_Book';
import { ICM_A_Link } from 'src/entities/ICM_A_Link';
import moment = require('moment');
import { ICM_A_FAQ } from 'src/entities/ICM_A_FAQ';
import { ICM_A_DataDownload } from 'src/entities/ICM_A_DataDownload';
import { ICM_A_News } from 'src/entities/ICM_A_News';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { ICM_A_ExhibitsE } from 'src/entities/ICM_A_ExhibitsE';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';
import { ICM_A_WebBanner } from 'src/entities/ICM_A_WebBanner';
import { ICM_A_Feedback } from 'src/entities/ICM_A_Feedback';

// import * as jwt from 'jsonwebtoken';

@Injectable()
export class WebService {


    constructor(
        @InjectRepository(ICM_A_Law)
        private readonly LawRepository: Repository<ICM_A_Law>,
        @InjectRepository(ICM_A_Book)
        private readonly BookRepository: Repository<ICM_A_Book>,
        @InjectRepository(ICM_A_Link)
        private readonly linkRepository: Repository<ICM_A_Link>,
        @InjectRepository(ICM_A_FAQ)
        private readonly faqRepository: Repository<ICM_A_FAQ>,
        @InjectRepository(ICM_A_DataDownload)
        private readonly DataDownloadRepository: Repository<ICM_A_DataDownload>,
        @InjectRepository(ICM_A_News)
        private readonly newsRepository: Repository<ICM_A_News>,
        @InjectRepository(ICM_A_Exhibits)
        private readonly ExhRepository: Repository<ICM_A_Exhibits>,
        @InjectRepository(ICM_A_WebBanner)
        private readonly webBannerRepository: Repository<ICM_A_WebBanner>,
        @InjectRepository(ICM_A_Feedback)
        private readonly feedbackRepository: Repository<ICM_A_Feedback>,
    ) { }

    async getLaw() {

        const data = this.LawRepository.createQueryBuilder('law')
            .innerJoinAndMapOne('law.Detail', ICM_A_LawDetail, 'LawDetail', 'law.ID = LawDetail.ID')
            // .where('law.language is null')
            .where('law.language =:language', { language: 'zh-tw' })
            .select(['law.ID', 'law.LawName', 'law.LawHis', 'law.file1', 'law.file2', 'LawDetail.Content'])
            .orderBy('law.orderby')
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('law.state = :state', { state: true })
        }
        return await data.getMany();

        /* 查詢後在Detail為單筆，非多筆
        this.LawRepository.createQueryBuilder('law')
            .innerJoinAndMapMany('law.Detail', ICM_A_LawDetail, 'LawDetail', 'law.ID = LawDetail.ID')
            .select(['law.ID', 'law.LawName', 'law.LawHis'])
            .addSelect(['LawDetail.LawNo','LawDetail.Content'])
            .getMany(); */
    }

    async getLaw_en() {
        const data = this.LawRepository.createQueryBuilder('law')
            .innerJoinAndMapOne('law.Detail', ICM_A_LawDetail, 'LawDetail', 'law.ID = LawDetail.ID')
            .where('law.language =:language', { language: 'en-us' })
            .select(['law.ID', 'law.LawName', 'law.LawHis', 'law.file1', 'law.file2', 'LawDetail.Content'])
            .orderBy('law.orderby')
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('law.state = :state', { state: true })
        }
        return await data.getMany();
    }

    async getBookList() {
        const data = await this.BookRepository.createQueryBuilder('book')
            .select(['book.bookname', 'book.content', 'book.user1', 'book.user2', 'book.org',
                'book.publishdate', 'book.language', 'book.ISBN', 'book.File1', 'book.File2', 'book.File3'])
            .orderBy('book.orderby')
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('book.state = :state', { state: true })
        }
        return await data.getMany();
    }

    async getLink() {
        const toDay = moment().format('YYYY-MM-DD');
        const data = this.linkRepository.createQueryBuilder('link')
            .select(['link.Title', 'link.Area', 'link.ImgSrc', 'link.Url', 'link.language'])
            .where(new Brackets(qb => {
                qb.where('link.startDate <= :startDate', { startDate: `${toDay}` })
                    .andWhere('link.endDate > :endDate', { endDate: `${toDay}` });
            }))
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('link.state = :state', { state: true })
        }
        return await data.getMany();
    }

    async getFAQ(id) {
        const data = this.faqRepository.createQueryBuilder('faq')
            .where('faq.language =:language', { language: `${id}` })
            .select(['faq.question', 'faq.answer', 'faq.faq_type'])
            .orderBy('faq.orderby')

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('faq.state = :state', { state: true })
        }
        return await data.getMany();
    }

    async getDataDownload(id) {
        const toDay = moment().format('YYYY-MM-DD');
        const data = this.DataDownloadRepository.createQueryBuilder('data')
            .where('data.mediaType =:mediaType', { mediaType: `${id}` })
            .andWhere(new Brackets(qb => {
                qb.where('data.startDate <= :startDate', { startDate: `${toDay}` })
                    .andWhere('data.endDate > :endDate', { endDate: `${toDay}` });
            }))
            .select(['data.ID', 'data.Title', 'data.content', 'data.File1', 'data.File2', 'data.File3', 'data.File4', 'data.File5'])

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('data.state = :state', { state: true })
        }
        return await data.getMany();

    }

    async getNews(id) {
        const toDay = moment().format('YYYY-MM-DD');
        const data = await this.newsRepository.createQueryBuilder('news')
            .where('news.lang =:lang', { lang: `${id}` })
            .andWhere(new Brackets(qb => {
                qb.where('news.publishStartDate <= :publishStartDate', { publishStartDate: `${toDay}` })
                    .andWhere('news.publishEndDate > :publishEndDate', { publishEndDate: `${toDay}` });
            }))
            .select(['news.Id', 'news.title', 'news.fileName', 'news.fileUrl',
                'news.Color', 'news.url', 'news.introduction', 'news.NewsType', 'news.publishStartDate'])
            .orderBy('news.publishStartDate', 'DESC')
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('news.state = :state', { state: true })
        }
        return await data.getMany();
    }

    async getNewsPage(id) {
        const data = this.newsRepository.createQueryBuilder('news')
            .where('news.Id =:Id', { Id: `${id}` })
            .select(['news.Id', 'news.title', 'news.content', 'news.fileName',
                'news.fileUrl', 'news.Color', 'news.url', 'news.introduction', 'news.NewsType', 'news.publishStartDate'])

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('news.state = :state', { state: true })
        }
        return await data.getOne();
    }

    async getCirculation(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.webSubType0 =:webSubType0', { webSubType0: `${id}` })
            .andWhere('exh.showWeb0 =:showWeb0', { showWeb0: true })

            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.ThumbnailImg'])
            .orderBy('exh.order0')
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getMany();
    }

    async getCirculation_en(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .innerJoin(ICM_A_ExhibitsE, 'en', 'exh.ExhibitsId = en.ExhibitsId')
            .where('exh.webSubType0 =:webSubType0', { webSubType0: `${id}` })
            .andWhere('exh.showWeb0 =:showWeb0', { showWeb0: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['en.ExhibitsId', 'en.ExhibitsName', 'exh.ThumbnailImg'])
            .orderBy('exh.order0')

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getRawMany();
    }

    async getCommemorate(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.webSubType1 =:webSubType1', { webSubType1: `${id}` })
            .andWhere('exh.showWeb1 =:showWeb1', { showWeb1: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.ThumbnailImg'])
            .orderBy('exh.order1')

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getMany();
    }

    async getCommemorate_en(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .innerJoin(ICM_A_ExhibitsE, 'en', 'exh.ExhibitsId = en.ExhibitsId')
            .where('exh.webSubType1 =:webSubType1', { webSubType1: `${id}` })
            .andWhere('exh.showWeb1 =:showWeb1', { showWeb1: true })

            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['en.ExhibitsId', 'en.ExhibitsName', 'exh.ThumbnailImg'])
            .orderBy('exh.order1')

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getRawMany();
    }

    async getStory(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.webSubType2 =:webSubType2', { webSubType2: `${id}` })
            .andWhere('exh.showWeb2 =:showWeb2', { showWeb2: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.ThumbnailImg', 'exh.PlateYear', 'exh.WebImg'])
            .orderBy('exh.order2')

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getMany();
    }

    async getStory_en(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .innerJoin(ICM_A_ExhibitsE, 'en', 'exh.ExhibitsId = en.ExhibitsId')
            .where('exh.webSubType2 =:webSubType2', { webSubType2: `${id}` })
            .andWhere('exh.showWeb2 =:showWeb2', { showWeb2: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['en.ExhibitsId', 'en.ExhibitsName', 'exh.ThumbnailImg', 'en.PlateYear', 'en.WebImg'])
            .orderBy('exh.order2')

        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getRawMany();
    }

    async getExhibits(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .innerJoinAndMapMany('exh.img', ICM_A_ExhibitsImgList, 'img', 'exh.ExhibitsId = img.ExhibitsId')
            .where('exh.ExhibitsId =:ExhibitsId', { ExhibitsId: `${id}` })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.ExhibitsVers', 'exh.PlateYear',
                'exh.IssueTime', 'exh.Area', 'exh.Dollar', 'exh.size_L', 'exh.size_W', 'exh.size_H',
                'exh.Obj_color1', 'exh.Obj_color2', 'exh.obj_material', 'exh.Obj_Type',
                'exh.imgDescr1', 'exh.imgDescr2', 'exh.imgDescr3', 'exh.Exhibits_Content', 'exh.ebook',
                'exh.Diameter', 'exh.Weight', 'exh.SurroundSwf', 'exh.ExtContent', 'exh.WebImg', 'exh.ExhibitsType', 'exh.FakeWeb',
                'img.imgType', 'img.imgSrc', 'img.imgName'])
            .orderBy({ 'img.sort': 'ASC' })
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getOne();
    }

    async getExhibits_en(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .innerJoinAndMapMany('exh.en', ICM_A_ExhibitsE, 'en', 'exh.ExhibitsId = en.ExhibitsId')
            .innerJoinAndMapMany('exh.img', ICM_A_ExhibitsImgList, 'img', 'exh.ExhibitsId = img.ExhibitsId')
            .where('exh.ExhibitsId =:ExhibitsId', { ExhibitsId: `${id}` })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.SurroundSwf', 'exh.ExtContent', 'exh.Obj_Type',
                'en.WebImg', 'exh.FakeWeb', 'exh.ebook',
                'en.ExhibitsName', 'en.IssueTime', 'en.size_L', 'en.size_W', 'en.size_H', 'en.PlateYear',
                'en.Obj_color1', 'en.Obj_color2', 'en.Weight', 'en.Diameter', 'en.Dollar', 'en.FakeWeb',
                'en.Area', 'en.obj_material', 'en.ExhibitsVers', 'en.imgDescr1', 'en.imgDescr2', 'en.imgDescr3', 'en.Exhibits_Content',
                'exh.ExhibitsType', 'img.imgType', 'img.imgSrc', 'img.imgName'])
            .orderBy({ 'img.sort': 'ASC' })
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getOne();
    }

    async getIndex(id) {
        const banner = this.webBannerRepository.createQueryBuilder('banner')
            .where('banner.lang =:lang', { lang: `${id}` })
            .select(['banner.imgSrc', 'banner.imgName', 'banner.imgUrl'])
            .orderBy('banner.sortId')

        if (process.env.IS_FRONT_API === 'true') {
            banner.andWhere('banner.state = :state', { state: true })
        }


        const message = this.newsRepository.createQueryBuilder('news')
            .where('news.lang =:lang', { lang: `${id}` })
            .andWhere('news.NewsType =:NewsType', { NewsType: 'MESSAGE' })
            .andWhere('news.publishStartDate <= GETDATE() and news.publishEndDate >= GETDATE()')
            .select(['news.Id', 'news.title', 'news.fileName', 'news.introduction'])
            .orderBy('news.publishStartDate', 'DESC')
            .take(2)

        if (process.env.IS_FRONT_API === 'true') {
            message.andWhere('news.state = :state', { state: true })
        }



        const sku = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.skuBrowsing =:skuBrowsing', { skuBrowsing: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.ThumbnailImg', 'exh.URLlink', 'exh.UpdatedTime'])
            .orderBy('exh.UpdatedTime', 'DESC')

        if (process.env.IS_FRONT_API === 'true') {
            sku.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }



        const promotion = await this.newsRepository.createQueryBuilder('news')
            .where('news.lang =:lang', { lang: `${id}` })
            .andWhere('news.NewsType =:NewsType', { NewsType: 'PROMOTION' })
            .andWhere('news.publishStartDate <= GETDATE() and news.publishEndDate >= GETDATE()')
            .select(['news.Id', 'news.title', 'news.fileName', 'news.introduction'])
            .orderBy('news.publishStartDate', 'DESC')
            .take(2)

        if (process.env.IS_FRONT_API === 'true') {
            promotion.andWhere('news.state = :state', { state: true })
        }

        if (id === 'zh-tw') {
            return {
                banner: await banner.getMany(),
                message: await message.getMany(),
                sku: await sku.getMany(),
                promotion: await promotion.getMany(),
            };

        } else {
            return {
                banner: await banner.getMany(),
                message: await message.getMany(),
                sku: [],
                promotion: [],
            };
        }
    }

    async PostFeedback(data: ICM_A_Feedback) {
        await this.feedbackRepository.save(data);
        return 'Sand Feedback OK!';
    }

    async GetFeedback(email: string) {
        return await this.feedbackRepository.createQueryBuilder('feedback')
            .where('feedback.email =:email', { email: `${email}` })
            .select(['feedback.SendName', 'feedback.Sendtitle', 'feedback.Replycontent', 'feedback.Status', 'feedback.CreatedTime'])
            .orderBy('feedback.CreatedTime', 'DESC')
            .getMany();
    }

    /*
    async jwt(data: string) {
        console.log('data:', data);
        const jj = jwt.verify(data, Buffer.from('brightideas', 'base64'), function (err, decoded) {
            console.log(err);
            console.log(decoded);
            return decoded;
        });
        console.log('jwt:', jj);
        return 'OK';
    }*/
}
