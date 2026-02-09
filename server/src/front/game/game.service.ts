import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICM_A_QAGame } from 'src/entities/ICM_A_QAGame';
import { Repository } from 'typeorm';
import { ICM_A_QAGameItem } from 'src/entities/ICM_A_QAGameItem';
import { ICM_B_QAGameLeague } from 'src/entities/ICM_B_AQGameLeague';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(ICM_A_QAGame)
        private readonly QAGameRepository: Repository<ICM_A_QAGame>,
        @InjectRepository(ICM_B_QAGameLeague)
        private readonly QAGameLeagueRepository: Repository<ICM_B_QAGameLeague>,
    ) { }

    async GetQAGame() {
        return await this.QAGameRepository.createQueryBuilder('qagame')
            .where('qagame.Status =:Status', { Status: true })
            .innerJoinAndMapMany('qagame.item', ICM_A_QAGameItem, 'item', 'qagame.ID = item.Game_ID AND item.Status = :Status', { Status: true })
            .select(['qagame.ID', 'qagame.Title', 'qagame.File1', 'qagame.File2',
                'item.ID', 'item.Title', 'item.Introduction', 'item.File1', 'item.Option1', 'item.Option2', 'item.Option3',
                'item.Option4', 'item.Option5', 'item.Option6', 'item.AnsOptionId',
            ])
            .getMany();

    }

    async GetQAGameLeague(id, Grade?) {
        return await this.QAGameLeagueRepository.createQueryBuilder('league')
            .where('league.Game_ID =:Game_ID', { Game_ID: `${id}` })
            .andWhere('league.Grade like :Grade', { Grade: '%' + `${Grade}` + '%' })
            .select(['league.Game_ID', 'league.Grade', 'league.UserName', 'league.Score', 'league.Percents', 'league.CreatedTime',
            ])
            .orderBy('Score' , 'DESC')
            .addOrderBy('CreatedTime', 'DESC')
            .take(10)
            .getMany();
    }

    async PostQAGameLeague(data: ICM_B_QAGameLeague) {
        await this.QAGameLeagueRepository.save(data);
        return 'Post Save  GameLeague OK';
    }

}
