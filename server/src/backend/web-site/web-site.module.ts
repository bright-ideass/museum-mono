import { NewsService } from './news/news.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerController } from './banner/banner.controller';
import { BannerService } from './banner/banner.service';
import { ICM_A_WebBanner } from 'src/entities/ICM_A_WebBanner';
import { FqaController } from './fqa/fqa.controller';
import { FqaService } from './fqa/fqa.service';
import { NewsController } from './news/news.controller';
import { LawService } from './law/law.service';
import { LawController } from './law/law.controller';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { LinkService } from './link/link.service';
import { LinkController } from './link/link.controller';
import { ICM_A_News } from 'src/entities/ICM_A_News';
import { ICM_A_FAQ } from 'src/entities/ICM_A_FAQ';
import { ICM_A_SysCode } from 'src/entities/ICM_A_SysCode';
import { ICM_A_Link } from 'src/entities/ICM_A_Link';
import { ICM_A_Law } from 'src/entities/ICM_A_Law';
import { ICM_A_LawDetail } from 'src/entities/ICM_A_LawDetail';
import { ICM_A_Book } from 'src/entities/ICM_A_Book';

@Module({
  imports: [TypeOrmModule.forFeature([ICM_A_WebBanner, ICM_A_News, ICM_A_FAQ, ICM_A_SysCode, ICM_A_Link, ICM_A_Law, ICM_A_LawDetail, ICM_A_Book])],
  controllers: [BannerController, FqaController, NewsController, LawController, BookController, LinkController],
  providers: [BannerService, FqaService, NewsService, LawService, BookService, LinkService]
})
export class WebSiteModule { }
