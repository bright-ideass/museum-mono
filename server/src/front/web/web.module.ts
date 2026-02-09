import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { ICM_A_Law } from 'src/entities/ICM_A_Law';
import { ICM_A_Book } from 'src/entities/ICM_A_Book';
import { ICM_A_Link } from 'src/entities/ICM_A_Link';
import { ICM_A_FAQ } from 'src/entities/ICM_A_FAQ';
import { ICM_A_DataDownload } from 'src/entities/ICM_A_DataDownload';
import { ICM_A_News } from 'src/entities/ICM_A_News';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { ICM_A_ExhibitsE } from 'src/entities/ICM_A_ExhibitsE';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';
import { ICM_A_WebBanner } from 'src/entities/ICM_A_WebBanner';
import { ICM_A_Feedback } from 'src/entities/ICM_A_Feedback';

@Module({
    imports: [TypeOrmModule.forFeature([ICM_A_Law, ICM_A_Book, ICM_A_Link, ICM_A_FAQ, ICM_A_DataDownload,
        ICM_A_News, ICM_A_Exhibits, ICM_A_ExhibitsE, ICM_A_ExhibitsImgList,
        ICM_A_WebBanner, ICM_A_Feedback])],
    controllers: [WebController],
    providers: [WebService],
})
export class WebModule { }
