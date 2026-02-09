import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_DataDownload } from 'src/entities/ICM_A_DataDownload';

@Injectable()
export class DataDownloadService {

    constructor(
        @InjectRepository(ICM_A_DataDownload)
        private readonly dataDownloadReps: Repository<ICM_A_DataDownload>,
    ) { }


    async findAll(MediaType: string): Promise<ICM_A_DataDownload[]> {
        return await this.dataDownloadReps.find({ where: { mediaType: MediaType } })
    }

    async findOne(id: number): Promise<ICM_A_DataDownload> {
        return await this.dataDownloadReps.findOne({ where: { ID: id } })

    }

    async saveOne(body: ICM_A_DataDownload): Promise<ICM_A_DataDownload> {
        if (!body.ID) {
            body.ID = undefined;
        }

        const d = await this.dataDownloadReps.save(body)
        if (d.File2.includes('.zip')) {
            await this.unCompress(d.File2, d.ID)
        }
        return d;
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.dataDownloadReps.findOneBy({
            ID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.dataDownloadReps.delete(id)
    }

    async unCompress(path: string, id: number): Promise<boolean> {
        const compressing = require('compressing');

        await compressing.zip.uncompress(`${process.env.FILE_UPLOAD_WEB_PATH}/${path}`, `${process.env.FILE_UPLOAD_GAME_PATH}/${id}`)
            .then(async compressDone => {
                await this.dataDownloadReps.createQueryBuilder()
                    .update()
                    .set({ File2: 'index.html' })
                    .where('ID = :Id ', { Id: id })
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
