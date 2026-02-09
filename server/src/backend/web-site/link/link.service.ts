import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_Link } from 'src/entities/ICM_A_Link';

@Injectable()
export class LinkService {

    constructor(
        @InjectRepository(ICM_A_Link)
        private readonly linkReps: Repository<ICM_A_Link>,
    ) { }

    async findAll(): Promise<ICM_A_Link[]> {
        return await this.linkReps.find()
    }

    async findOne(id: number): Promise<ICM_A_Link> {
        return await this.linkReps.findOne({ where: { Id: id } })

    }

    async saveOne(body: ICM_A_Link): Promise<ICM_A_Link> {

        if (!body.Id) {
            body.Id = undefined;
        }
        return await this.linkReps.save(body)
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.linkReps.findOneBy({
            Id: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.linkReps.delete(id)
    }
}
