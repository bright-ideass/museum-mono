import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Brackets } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { ICM_A_ExhibitsE } from 'src/entities/ICM_A_ExhibitsE';
import { ICM_A_Code } from 'src/entities/ICM_A_Code';
import { ICM_A_SubCode } from 'src/entities/ICM_A_SubCode';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';
import { format} from 'date-fns'

@Injectable()
export class ExhibitService {

    constructor(
        @InjectRepository(ICM_A_Exhibits)
        private readonly exhibitReps: Repository<ICM_A_Exhibits>,
        @InjectRepository(ICM_A_ExhibitsE)
        private readonly exhibitEnReps: Repository<ICM_A_ExhibitsE>,
        @InjectRepository(ICM_A_Code)
        private readonly codeReps: Repository<ICM_A_Code>,
        @InjectRepository(ICM_A_SubCode)
        private readonly subCodeReps: Repository<ICM_A_SubCode>,
    ) { }

    async findCodeAll(id: string): Promise<ICM_A_Code[]> {
        return await this.codeReps.find({ where: { Code: id } })
    }
    async findSubCodeAll(codeId: number): Promise<ICM_A_SubCode[]> {
        return await this.subCodeReps.find({ where: { CodeID: codeId } })
    }

    async findAll(): Promise<ICM_A_Exhibits[]> {
        return await this.exhibitReps.find()
    }

    async findOne(id: number): Promise<ICM_A_Exhibits> {
        let data = await this.exhibitReps.findOne({ where: { ExhibitsId: id } })
        data.en = await this.exhibitEnReps.findOne({ where: { ExhibitsId: id } })
        return data;
    }

    async findPreview(id: number) {
        return await this.exhibitReps.createQueryBuilder('exhibits')
            .where('exhibits.ExhibitsId = :ExhibitsId', { ExhibitsId: `${id}` })
            .select(['exhibits.ExhibitsId', 'exhibits.ExhibitsName', 'exhibits.ExhibitsVers', 'exhibits.IssueTime', 'exhibits.Area', 'exhibits.PlateYear', 'exhibits.Dollar', 'exhibits.size_L', 'exhibits.size_W', 'exhibits.Obj_color1', 'exhibits.Obj_color2', 'exhibits.obj_material', 'exhibits.Obj_Type', 'exhibits.imgDescr1', 'exhibits.imgDescr2', 'exhibits.Exhibits_Story', 'exhibits.Diameter', 'exhibits.Weight', 'exhibits.EnlargeImg1', 'exhibits.EnlargeImg2', 'exhibits.RelatedLink', 'exhibits.ExtContent', 'exhibits.googleMap'])
            .getOne();
    }

    async saveOne(body: ICM_A_Exhibits): Promise<ICM_A_Exhibits> {
        if (!body.ExhibitsId) {
            body.ExhibitsId = undefined;
        }

        if (body.ShowStarttime) {
            body.ShowStarttime = format(new Date(body.ShowStarttime), 'yyyy-MM-dd');
            console.log(body.ShowStarttime)
        }
        if (body.ShowEndtime) {
            body.ShowEndtime = format(new Date(body.ShowEndtime), 'yyyy-MM-dd');
            console.log(body.ShowStarttime)
        }
        const data = await this.exhibitReps.save(body)

        if (body.en) {
            body.en.ExhibitsId = data.ExhibitsId;
            await this.exhibitEnReps.save(body.en)
        }

        if (body.ebook?.includes('.zip')) {
            await this.unCompress(body.ebook, body.ExhibitsId)
        }

        return data;
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.exhibitReps.findOneBy({
            ExhibitsId: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.exhibitReps.delete(id)
    }

    async unCompress(path: string, id: number): Promise<boolean> {
        const compressing = require('compressing');

        await compressing.zip.uncompress(`${process.env.FILE_UPLOAD_WEB_PATH}/${path}`, `${process.env.FILE_UPLOAD_EBOOK_PATH}/${id}`)
            .then(async compressDone => {
                await this.exhibitReps.createQueryBuilder()
                    .update()
                    .set({ ebook: 'index.html' })
                    .where('ExhibitsId = :Id ', { Id: id })
                    .execute()
                console.log('compressDone:', compressDone)
                return true;
            })
            .catch(handleError => {
                console.log('compressDone handleError:', handleError)
                return false;
            });
        return false
    }

}
