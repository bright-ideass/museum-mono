import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_Book } from 'src/entities/ICM_A_Book';


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(ICM_A_Book)
        private readonly bookReps: Repository<ICM_A_Book>,
    ) { }

    async findAll(): Promise<ICM_A_Book[]> {
        return await this.bookReps.find({ order: { orderby: "ASC" } })
    }

    async findOne(id: number): Promise<ICM_A_Book> {
        return await this.bookReps.findOne({ where: { ID: id } })

    }

    async saveOne(body: ICM_A_Book): Promise<ICM_A_Book> {
        if (!body.ID) {
            body.ID = undefined;
        }
        return await this.bookReps.save(body)
    }

    async sort(body: ICM_A_Book[]) {
        body.forEach(async e => {
            await this.bookReps.createQueryBuilder()
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
        const data = await this.bookReps.findOneBy({
            ID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.bookReps.delete(id)
    }
}
