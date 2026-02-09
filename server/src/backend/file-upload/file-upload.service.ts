import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';
import { exhibitsImgListDTO } from 'src/common/dto/exhibits-Img-list.dto';
@Injectable()
export class FileUploadService {
    constructor(
        @InjectRepository(ICM_A_ExhibitsImgList)
        private readonly exhibitImgListReps: Repository<ICM_A_ExhibitsImgList>,
    ) { }

    async findImgListAll(id: number): Promise<ICM_A_ExhibitsImgList[]> {
        return await this.exhibitImgListReps.find({ where: { ExhibitsId: id }, order: { sort: 'ASC' } })
    }

    async save(data: any, id: number): Promise<ICM_A_ExhibitsImgList> {
        const imgData = await this.findImgListAll(id)
        const file = new ICM_A_ExhibitsImgList();
        file.ExhibitsId = id;
        file.imgType = '正面';
        file.imgName = data.originalname.split('.').slice(0, -1).join('.');;
        file.imgSrc = data.path.replace(/\\/g, '/').replace(`${process.env.FILE_UPLOAD_SEARCH_PATH}/`, ``)
        file.sort = imgData.length || 1;
        return await this.exhibitImgListReps.save(file)
    }

    async sortImgList(body: ICM_A_ExhibitsImgList[]): Promise<string> {
        body.forEach(async e => {
            await this.exhibitImgListReps.createQueryBuilder()
                .update()
                .set({
                    sort: e.sort
                })
                .where('imgID = :id', { id: e.imgID })
                .execute()
        })
        return 'update Sort'
    }

    async infoImgList(body: ICM_A_ExhibitsImgList): Promise<string> {
        await this.exhibitImgListReps.createQueryBuilder()
            .update()
            .set({
                imgName: body.imgName
            })
            .where('imgID = :id', { id: body.imgID })
            .execute()

        return 'update info'
    }

    async findImgListDelete(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.exhibitImgListReps.findOneBy({
            imgID: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.exhibitImgListReps.delete(id)
    }

}
