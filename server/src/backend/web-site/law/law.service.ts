import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_Law } from 'src/entities/ICM_A_Law';
import { ICM_A_LawDetail } from 'src/entities/ICM_A_LawDetail';

@Injectable()
export class LawService {
    constructor(
        @InjectRepository(ICM_A_Law)
        private readonly lawReps: Repository<ICM_A_Law>,
        @InjectRepository(ICM_A_LawDetail)
        private readonly lawDetailReps: Repository<ICM_A_LawDetail>,
    ) { }


    async findAll(Lang: string): Promise<ICM_A_Law[]> {
        return await this.lawReps.find({ where: { language: Lang }, order: { orderby: "ASC" } })
    }

    async findOne(id: number): Promise<ICM_A_Law> {
        return await this.lawReps.createQueryBuilder('law')
            .innerJoinAndMapOne('law.Detail', ICM_A_LawDetail, 'LawDetail', 'law.ID = LawDetail.ID')
            .where('law.ID =:ID', { ID: `${id}` })
            .getOne();

    }

    async saveOne(body: ICM_A_Law): Promise<ICM_A_Law> {
        if (!body.ID) {
            body.ID = undefined;
        }

        const data = await this.lawReps.save(body)

        if (body.Detail) {
            if (!body.Detail.ID) { body.Detail.ID = undefined; }
            body.Detail.ID = data.ID;
            await this.lawDetailReps.save(body.Detail)
        }
        return data;
    }

    async sort(body: ICM_A_Law[]) {
        body.forEach(async e => {
            await this.lawReps.createQueryBuilder()
                .update()
                .set({
                    orderby: e.orderby
                })
                .where('ID = :id', { id: e.ID })
                .execute()
        })
        return 'update Sort'
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.lawReps.findOneBy({
            ID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.lawReps.delete(id)
    }

}
