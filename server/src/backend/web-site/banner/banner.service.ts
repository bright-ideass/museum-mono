import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICM_A_WebBanner } from 'src/entities/ICM_A_WebBanner';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class BannerService {
    constructor(
        @InjectRepository(ICM_A_WebBanner)
        private readonly webBannerReps: Repository<ICM_A_WebBanner>,
    ) { }

    async findAll(Lang: string): Promise<ICM_A_WebBanner[]> {
        return await this.webBannerReps.find({ where: { lang: Lang }, order: { sortId: "ASC" } })
    }

    async findOne(id: number): Promise<ICM_A_WebBanner> {
        return await this.webBannerReps.findOne({ where: { ID: id } })

    }

    async saveOne(body: ICM_A_WebBanner): Promise<ICM_A_WebBanner> {
        if (!body.ID) {
            body.ID = undefined;
        }
        return await this.webBannerReps.save(body)
    }

    async sort(body: ICM_A_WebBanner[]) {
        body.forEach(async e => {
            await this.webBannerReps.createQueryBuilder()
                .update()
                .set({
                    sortId: e.sortId
                })
                .where('ID = :id', { id: e.ID })
                .execute()
        })
        return 'update Sort'
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.webBannerReps.findOneBy({
            ID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.webBannerReps.delete(id)
    }
}
