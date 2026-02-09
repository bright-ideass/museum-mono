import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import * as moment from 'moment';
import { ICM_A_Navigation } from 'src/entities/ICM_A_Navigation';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { ICM_A_NavigationExhibits } from 'src/entities/ICM_A_NavigationExhibits';

@Injectable()
export class MuseumService {

    constructor(
        @InjectRepository(ICM_A_Navigation)
        private readonly NavigationRepository: Repository<ICM_A_Navigation>,
        @InjectRepository(ICM_A_Exhibits)
        private readonly ExhibitsRepository: Repository<ICM_A_Exhibits>,
        @InjectRepository(ICM_A_NavigationExhibits)
        private readonly NESRepository: Repository<ICM_A_NavigationExhibits>,

    ) { }

    async Get_NavigationExhibits() {
        return await this.NavigationRepository.find();
    }

    async getExhibits(id) {
        const exhibits: any = [];
        return await this.ExhibitsRepository.createQueryBuilder('exhibits')
            .where('exhibits.ExhibitsId = :ExhibitsId', { ExhibitsId: `${id}` })
            .select(['exhibits.ExhibitsId', 'exhibits.ExhibitsName', 'exhibits.ExhibitsVers', 'exhibits.IssueTime', 'exhibits.Area', 'exhibits.PlateYear', 'exhibits.Dollar', 'exhibits.size_L', 'exhibits.size_W', 'exhibits.Obj_color1', 'exhibits.Obj_color2', 'exhibits.obj_material', 'exhibits.Obj_Type', 'exhibits.imgDescr1', 'exhibits.imgDescr2', 'exhibits.Exhibits_Story', 'exhibits.Diameter', 'exhibits.Weight', 'exhibits.EnlargeImg1', 'exhibits.EnlargeImg2', 'exhibits.RelatedLink', 'exhibits.ExtContent', 'exhibits.googleMap'])
            .getOne();
    }

    async getIndex() {
        const toDay = moment().format('YYYY-MM-DD');
        const tomorrowDay = moment().add(1, 'days').format('YYYY-MM-DD');
        const data = this.NavigationRepository.createQueryBuilder('navigation')
            .where(new Brackets(qb => {
                qb.where('navigation.showDate1 <= :showDate1', { showDate1: `${toDay}` })
                    .andWhere('navigation.showDate2 >= :showDate2', { showDate2: `${tomorrowDay}` })
            }))
            .select(['navigation.NavigationId', 'navigation.Navigation', 'navigation.showDate1', 'navigation.showDate2', 'navigation.note', 'navigation.ImgSrc', 'navigation.mainVoice', 'navigation.ImgSrcMain1', 'navigation.room1_Name', 'navigation.room1_img0', 'navigation.room1_desc', 'navigation.room2_Name', 'navigation.room2_img0', 'navigation.room2_desc', 'navigation.room3_Name', 'navigation.room3_img0', 'navigation.room3_desc', 'navigation.room1_voice', 'navigation.room2_voice', 'navigation.room3_voice', 'navigation.CssType'])
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('navigation.state = :state', { state: true })
        }
        return await data.getMany();


    }

    async getLiveList(id, roomid) {
        const data = this.NESRepository.createQueryBuilder('ne')
            .innerJoinAndSelect(ICM_A_Exhibits, 'ex', 'ne.ExhibitsId = ex.ExhibitsId')
            .where('ne.NavigationId =:NavigationId', { NavigationId: `${id}` })
            .andWhere('ne.RoodId =:RoodId', { RoodId: `${roomid}` })
            .select(['ex.ExhibitsId as ExhibitsId', 'ex.ExhibitsName as ExhibitsName', 'ex.Location as Location', 'ex.imgDescr1 as imgDescr1', 'ex.EnlargeImg1 as EnlargeImg1'])
            .orderBy('ne.Sort')            
     
        return await data.getRawMany();

    }

    async getReview() {
        const toDay = moment().format('YYYY-MM-DD');
        const data = this.NavigationRepository.createQueryBuilder('navigation')
            .where(new Brackets(qb => {
                qb.where('navigation.showDate2 <= :showDate2', { showDate2: `${toDay}` })
            }))
            .andWhere('navigation.NavigationType =:NavigationType', { NavigationType: true })
            .select(['navigation.NavigationId', 'navigation.Navigation', 'navigation.showDate1', 'navigation.showDate2', 'navigation.note', 'navigation.mainVoice', 'navigation.ImgSrc', 'navigation.room1_Name', 'navigation.room1_img0', 'navigation.room1_desc', 'navigation.room2_Name', 'navigation.room2_img0', 'navigation.room2_desc', 'navigation.room3_Name', 'navigation.room3_img0', 'navigation.room3_desc', 'navigation.room1_voice', 'navigation.room2_voice', 'navigation.room3_voice', 'navigation.CssType'])

        return await data.getMany();
    }

    async getReviewList(id) {
        const data = this.NESRepository.createQueryBuilder('ne')
            .innerJoinAndSelect(ICM_A_Exhibits, 'ex', 'ne.ExhibitsId = ex.ExhibitsId')
            .innerJoinAndSelect(ICM_A_Navigation, 'Nav', 'ne.NavigationId = Nav.NavigationId')
            .where('ne.NavigationId =:NavigationId', { NavigationId: `${id}` })
            .select(['ex.ExhibitsId as ExhibitsId', 'ex.ExhibitsName as ExhibitsName', 'ex.Location as Location', 'ex.imgDescr1 as imgDescr1', 'ex.EnlargeImg1 as EnlargeImg1'])
            .addSelect([`CASE ne.RoodId WHEN 3 THEN Nav.room3_Name WHEN 2 THEN Nav.room2_Name ELSE Nav.room1_Name END as RoodName`])
            .orderBy({ 'ne.RoodId': 'ASC', 'ne.Sort': 'ASC' })

        return await data.getRawMany();
    }

    async getSpecialList(id) {
        const data = this.NESRepository.createQueryBuilder('ne')
            .innerJoinAndSelect(ICM_A_Exhibits, 'ex', 'ne.ExhibitsId = ex.ExhibitsId')
            .where('ne.NavigationId =:NavigationId', { NavigationId: `${id}` })
            .select(['ex.ExhibitsId as ExhibitsId', 'ex.ExhibitsName as ExhibitsName', 'ex.Location as Location',
                'ex.imgDescr1 as imgDescr1', 'ex.EnlargeImg1 as EnlargeImg1'])

        return await data.getRawMany();

        /*
        return await this.ExhibitsRepository.createQueryBuilder('ex')
            .where('ex.PeriodID = :PeriodID', { PeriodID: `${id}` })
            .select(['ex.ExhibitsId', 'ex.ExhibitsName', 'ex.Location', 'ex.imgDescr1', 'ex.EnlargeImg1'])
            .getMany();
            */
    }
}
