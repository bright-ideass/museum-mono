import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_FAQ } from 'src/entities/ICM_A_FAQ';
import { ICM_A_SysCode } from 'src/entities/ICM_A_SysCode';

@Injectable()
export class FqaService {
    constructor(
        @InjectRepository(ICM_A_FAQ)
        private readonly faqReps: Repository<ICM_A_FAQ>,
        @InjectRepository(ICM_A_SysCode)
        private readonly sysCodeReps: Repository<ICM_A_SysCode>,
    ) { }

    async findFaqType(Lang: string): Promise<ICM_A_SysCode[]> {
        return await this.sysCodeReps.find({ where: { lang: Lang, Type: 'QUESTION' } })
    }


    async findAll(Lang: string): Promise<ICM_A_FAQ[]> {
        return await this.faqReps.find({ where: { language: Lang }, order: { orderby: "ASC" } })
    }

    async findOne(Id: number): Promise<ICM_A_FAQ> {
        return await this.faqReps.findOne({ where: { id: Id } })

    }

    async saveOne(body: ICM_A_FAQ): Promise<ICM_A_FAQ> {
        if (!body.id) {
            body.id = undefined;
        }
        return await this.faqReps.save(body)
    }

    async sort(body: ICM_A_FAQ[]) {
        body.forEach(async e => {
            await this.faqReps.createQueryBuilder()
                .update()
                .set({
                    orderby: e.orderby
                })
                .where('id = :id', { id: e.id })
                .execute()
        })
        return 'update Sort'
    }

    async remove(Id: number): Promise<DeleteResult> {
        if (!Id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.faqReps.findOneBy({
            id: Id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.faqReps.delete(Id)
    }
}
