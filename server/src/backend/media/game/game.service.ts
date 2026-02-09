import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_QAGame } from 'src/entities/ICM_A_QAGame';
import { ICM_A_QAGameItem } from 'src/entities/ICM_A_QAGameItem';
@Injectable()
export class GameService {

    constructor(
        @InjectRepository(ICM_A_QAGame)
        private readonly gameReps: Repository<ICM_A_QAGame>,
        @InjectRepository(ICM_A_QAGameItem)
        private readonly gameItemReps: Repository<ICM_A_QAGameItem>,
    ) { }


    async findAll(): Promise<ICM_A_QAGame[]> {
        return await this.gameReps.find()
    }

    async findOne(id: number): Promise<ICM_A_QAGame> {
        return await this.gameReps.findOne({ where: { ID: id } })
    }

    async saveOne(body: ICM_A_QAGame): Promise<ICM_A_QAGame> {
        if (!body.ID) {
            body.ID = undefined;
        }
        return await this.gameReps.save(body)
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.gameReps.findOneBy({
            ID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.gameReps.delete(id)
    }


    async findAllItem(): Promise<ICM_A_QAGameItem[]> {
        return await this.gameItemReps.find()
    }


    async findOneItem(id: number): Promise<ICM_A_QAGameItem> {
        return await this.gameItemReps.findOne({ where: { ID: id } })
    }

    async saveOneItem(body: ICM_A_QAGameItem): Promise<ICM_A_QAGameItem> {
        if (!body.ID) {
            body.ID = undefined;
        }
        return await this.gameItemReps.save(body)
    }

    async removeItem(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.gameItemReps.findOneBy({
            ID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.gameItemReps.delete(id)
    }

}
