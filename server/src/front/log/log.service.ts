import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICM_B_ExhibitsVisit } from 'src/entities/ICM_B_ExhibitsVisit';
import { Repository } from 'typeorm';
import { ICM_B_Stastics } from 'src/entities/ICM_B_Stastics';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LogService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(ICM_B_ExhibitsVisit)
        private readonly ExhRepository: Repository<ICM_B_ExhibitsVisit>,
        @InjectRepository(ICM_B_Stastics)
        private readonly stasticsRepository: Repository<ICM_B_Stastics>,

    ) { }

    async PostExhVisit(data: ICM_B_ExhibitsVisit) {  
        return await this.ExhRepository.save(data);
    }

    async PostStastics(data: ICM_B_Stastics) {

        return await this.stasticsRepository.save(data);;
    }

}