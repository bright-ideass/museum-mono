import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ICM_A_Navigation } from 'src/entities/ICM_A_Navigation';
import { ICM_A_NavigationExhibits } from 'src/entities/ICM_A_NavigationExhibits';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { NavigationExhSaveDto, NavigationExhibitsDto } from 'src/common/dto/exhibits-Img-list.dto';

@Injectable()
export class NavigationService {
    constructor(
        @InjectRepository(ICM_A_Navigation)
        private readonly navigationReps: Repository<ICM_A_Navigation>,
        @InjectRepository(ICM_A_NavigationExhibits)
        private readonly navigationExhibitsEnReps: Repository<ICM_A_NavigationExhibits>,
        @InjectRepository(ICM_A_Exhibits)
        private readonly exhibitsEnReps: Repository<ICM_A_Exhibits>,

    ) { }

    async findAll(): Promise<ICM_A_Navigation[]> {
        return await this.navigationReps.find()
    }

    async findOne(id: number): Promise<ICM_A_Navigation> {
        return await this.navigationReps.findOne({ where: { NavigationId: id } })
    }

    async saveOne(body: ICM_A_Navigation): Promise<ICM_A_Navigation> {
        if (!body.NavigationId) {
            body.NavigationId = undefined;
        }
        return await this.navigationReps.save(body)
    }

    async remove(id: number): Promise<DeleteResult> {
        if (!id) throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        const data = await this.navigationReps.findOneBy({
            NavigationId: id
        });
        if (!data) {
            throw new HttpException(`not find id`, HttpStatus.NOT_FOUND)
        }
        return await this.navigationReps.delete(id)
    }
    async findExhList(id: number) {
        const Exhibits = await this.exhibitsEnReps.createQueryBuilder('e')
            .select(['e.ExhibitsId', 'e.ExhibitsName', 'e.InputNo'])
            .getMany();

        const room = await this.navigationExhibitsEnReps.find({
            where: {
                NavigationId: id
            },
            select: ['id', 'ExhibitsId', 'ExhibitsName', 'RoodId', 'Sort']
        })

         // const Exhibits = ExhibitsData.filter(item => !room.some(roomItem => roomItem.ExhibitsId === item.ExhibitsId));
        return { Exhibits, room }

    }

    async ExhListSave(id: number, body: NavigationExhSaveDto) {
        const nav = await this.navigationReps.findOne({ where: { NavigationId: id } })

        if (!nav) throw new HttpException(`not find NavigationId`, HttpStatus.NOT_FOUND)
        await this.navigationExhibitsEnReps
            .createQueryBuilder()
            .delete()
            .where("NavigationId = :NavigationId", { NavigationId: nav.NavigationId })
            .execute()

        if (body?.room1.length > 0) {
            for (let item of body.room1) {
                await this.ExhListCheckSave(1, nav, item);
            }
        }


        if (body?.room2.length > 0) {
            for (let item of body.room2) {
                await this.ExhListCheckSave(2, nav, item);
            }
        }
        if (body?.room3.length > 0) {
            for (let item of body.room3) {
                await this.ExhListCheckSave(3, nav, item);
            }
        }
        return 'room change ok';
    }

    async ExhListCheckSave(room: number, nav: ICM_A_Navigation, body: NavigationExhibitsDto) {
        const data = new ICM_A_NavigationExhibits();
        data.id = undefined;
        data.NavigationId = nav.NavigationId;
        data.ExhibitsId = body.ExhibitsId;
        data.ExhibitsName = body.ExhibitsName || undefined;
        data.Navigation = nav.Navigation;
        data.RoodId = room;
        data.Sort = body.Sort || undefined;
        await this.navigationExhibitsEnReps.save(data)
    }


}
