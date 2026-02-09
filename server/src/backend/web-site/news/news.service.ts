import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICM_A_News } from 'src/entities/ICM_A_News';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(ICM_A_News)
        private readonly newsReps: Repository<ICM_A_News>,
    ) { }

    async findAll(Lang: string): Promise<ICM_A_News[]> {
        return await this.newsReps.find({ where: { lang: Lang }, order: { publishStartDate: "DESC" } })
    }

    async findOne(id: number): Promise<ICM_A_News> {
        return await this.newsReps.findOne({ where: { Id: id } })

    }

    async saveOne(body: ICM_A_News): Promise<ICM_A_News> {
        body.Publish = 0;
        if (!body.Id) {
            body.Id = undefined;
        }
        return await this.newsReps.save(body)
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.newsReps.findOneBy({
            Id: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.newsReps.delete(id)
    }

}
