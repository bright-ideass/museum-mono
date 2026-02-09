import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { Repository, Brackets } from 'typeorm';
import { ICM_A_SubCode } from 'src/entities/ICM_A_SubCode';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(ICM_A_Exhibits)
        private readonly ExhRepository: Repository<ICM_A_Exhibits>,
        @InjectRepository(ICM_A_SubCode)
        private readonly subCodeRepository: Repository<ICM_A_SubCode>,
    ) { }

    async getCollectionList(id, skip?, plateyear?, name?) {

        const List = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.PeriodTypeID =:PeriodTypeID', { PeriodTypeID: `${id}` })
            .andWhere('exh.PlateYearDC like :PlateYearDC', { PlateYearDC: '%' + plateyear + '%' })
            .andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .andWhere('exh.ExhibitsName like :ExhibitsName', { ExhibitsName: '%' + `${name}` + '%' })

        List.select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.ThumbnailImg', 'exh.IssueTimeDC', 'exh.PlateYearDC', 'exh.PlateYear',
            'exh.PeriodID', 'exh.PeriodTypeID'])
            .addSelect(`CASE exh.IssueTimeDC WHEN 0 THEN exh.PlateYearDC ELSE exh.IssueTimeDC END`, 'dc')
            .orderBy('dc', 'ASC')
            .addOrderBy('exh.PlateYearDC', 'ASC')
            .addOrderBy('exh.ExhibitsId', 'ASC')
            .skip(skip)
            .take(9)


        const PlateYear = await this.ExhRepository.createQueryBuilder('exh')
            .where('exh.PeriodTypeID =:PeriodTypeID', { PeriodTypeID: `${id}` })
            .andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.PlateYear', 'exh.PlateYearDC'])
            .orderBy('exh.PlateYearDC', 'ASC')
            .groupBy('exh.PlateYear')
            .addGroupBy('exh.PlateYearDC')
            .getRawMany();

        const ExhibitsName = await this.ExhRepository.createQueryBuilder('exh')
            .where('exh.PeriodTypeID =:PeriodTypeID', { PeriodTypeID: `${id}` })
            .andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsName'])
            .orderBy('exh.ExhibitsName', 'ASC')
            .groupBy('exh.ExhibitsName')
            .getRawMany();

        return { list: await List.getManyAndCount(), plateyear: PlateYear, exhibitsname: ExhibitsName };
    }

    async getSubCode() {
        const SubCode = { A: [], B: [], C: [], D: [], E: [] };
        SubCode.A = await this.subCodeRepository.createQueryBuilder('subcode')
            .where('subcode.CodeID =:CodeID', { CodeID: 1 })
            .select(['subcode.ID', 'subcode.CodeID', 'subcode.SubCodeName'])
            .orderBy('subcode.SubIDNo')
            .getMany();

        SubCode.B = await this.subCodeRepository.createQueryBuilder('subcode')
            .where('subcode.CodeID =:CodeID', { CodeID: 2 })
            .select(['subcode.ID', 'subcode.CodeID', 'subcode.SubCodeName'])
            .orderBy('subcode.SubIDNo')
            .getMany();

        SubCode.C = await this.subCodeRepository.createQueryBuilder('subcode')
            .where('subcode.CodeID =:CodeID', { CodeID: 3 })
            .select(['subcode.ID', 'subcode.CodeID', 'subcode.SubCodeName'])
            .orderBy('subcode.SubIDNo')
            .getMany();

        SubCode.D = await this.subCodeRepository.createQueryBuilder('subcode')
            .where('subcode.CodeID =:CodeID', { CodeID: 4 })
            .select(['subcode.ID', 'subcode.CodeID', 'subcode.SubCodeName'])
            .orderBy('subcode.SubIDNo')
            .getMany();

        SubCode.E = await this.subCodeRepository.createQueryBuilder('subcode')
            .where('subcode.CodeID =:CodeID', { CodeID: 5 })
            .select(['subcode.ID', 'subcode.CodeID', 'subcode.SubCodeName'])
            .orderBy('subcode.SubIDNo')
            .getMany();
        return SubCode;
    }

    async getSubCodeName(id) {
        return await this.subCodeRepository.createQueryBuilder('subcode')
            .where('subcode.ID =:ID', { ID: `${id}` })
            .select(['subcode.SubCodeName'])
            .getOne();
    }

    async getExhibits(id) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .innerJoinAndMapMany('exh.img', ICM_A_ExhibitsImgList, 'img', 'exh.ExhibitsId = img.ExhibitsId')
            .where('exh.ExhibitsId =:ExhibitsId', { ExhibitsId: `${id}` })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .select(['exh.ExhibitsId', 'exh.InputNo', 'exh.ExhibitsName', 'exh.IssueTime',
                'exh.PlateYear', 'exh.Area', 'exh.obj_material', 'exh.ExhibitsType', 'exh.ExhibitsVers',
                'exh.size_L', 'exh.size_W', 'exh.Obj_color1', 'exh.Obj_color2', 'exh.Obj_Type',
                'exh.imgDescr1', 'exh.imgDescr2', 'exh.Exhibits_Content', 'exh.Diameter', 'exh.Weight',
                'exh.EnlargeImg1', 'exh.EnlargeImg2', 'exh.UpdatedTime', 'img.imgType', 'img.imgSrc', 'img.imgName'])
            .orderBy({ 'img.sort': 'ASC' })
        if (process.env.IS_FRONT_API === 'true') {
            data.andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
        }
        return await data.getOne();
    }

    async getSearch(skip, keyword?, Periodid?, type?) {
        const data = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.IsPublish =:IsPublish', { IsPublish: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))
            .andWhere(new Brackets(qb => {
                qb.where('exh.ExhibitsName like :ExhibitsName', { ExhibitsName: '%' + `${keyword}` + '%' })
                    .orWhere('exh.PlateYear like :PlateYear', { PlateYear: '%' + `${keyword}` + '%' })
                    .orWhere('exh.Dollar like :Dollar', { Dollar: '%' + `${keyword}` + '%' })
                    .orWhere('exh.Area like :Area', { Area: '%' + `${keyword}` + '%' })
                    .orWhere('exh.Keywords like :Keywords', { Keywords: '%' + `${keyword}` + '%' })
                    .orWhere('exh.Exhibits_Content like :Exhibits_Content', { Exhibits_Content: '%' + `${keyword}` + '%' });
            }))
            .andWhere('exh.PeriodID like :PeriodID', { PeriodID: '%' + `${Periodid}` + '%' })
            .andWhere('exh.ExhibitsType like :ExhibitsType', { ExhibitsType: '%' + `${type}` + '%' })

        
        
        

        return await data.select(['exh.ExhibitsId', 'exh.InputNo', 'exh.ExhibitsName', 'exh.ThumbnailImg',
            'exh.IssueTimeDC', 'exh.PlateYearDC', 'exh.PeriodID', 'exh.PeriodTypeID'])
            // .orderBy('exh.IssueTimeDC')
            // .addOrderBy('PlateYearDC')
            .skip(skip)
            .take(8)
            .getManyAndCount();



    }

    // 此段為測試用資料
    async getTeseList(id, skip, plateyear?, name?) {
        const asd = 'http://vrfvvr.com/';
        const List = this.ExhRepository.createQueryBuilder('exh')
            .where('exh.PeriodTypeID =:PeriodTypeID', { PeriodTypeID: `${id}` })
            /*
            .andWhere('exh.IsPublish =:IsPublish', { IsPublish: true })
            .andWhere(new Brackets(qb => {
                qb.where('exh.ShowEndtime >= GETDATE()')
                    .orWhere('exh.onForever = :onForever', { onForever: false });
            }))*/
            .andWhere('exh.PlateYear like :PlateYear', { PlateYear: '%' + `${plateyear}` + '%' })
            // .andWhere('exh.ExhibitsName like :ExhibitsName', { ExhibitsName: '%' + `${name}` + '%' })
            .select(['exh.ExhibitsId', 'exh.ExhibitsName', 'exh.IssueTimeDC', 'exh.PlateYearDC', `'${asd}' + exh.ThumbnailImg  as ThumbnailImg`])
            // , 'exh.PlateYear','exh.PeriodID', 'exh.PeriodTypeID'
            // 將URL加入exh.ThumbnailImg欄位
            // .addSelect(`'${asd}' + exh.ThumbnailImg  as ThumbnailImg`)
            .orderBy({
                'exh.IssueTimeDC': 'DESC',
                'exh.PlateYearDC': 'DESC',
                'exh.ExhibitsId': 'ASC',
            })
            // .addOrderBy('exh.PlateYearDC')
            .skip(skip)
            .take(9);

        const Lists = await List.getRawMany();
        const ListCount = await List.getCount();
        return [Lists, ListCount];
    }
}
