import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cbcLog } from 'src/entities/cbclog.entity';
import { Repository, } from 'typeorm';

@Injectable()
export class CbcLogService {
    constructor(
        @InjectRepository(cbcLog)
        private readonly cbcLogReps: Repository<cbcLog>,
    ) { }

    async addCbcLog(data: cbcLog) {
        return await this.cbcLogReps.save(data)
    }

    async getCbcLog() {
        return await this.cbcLogReps.find({
            take: 1000,
            order: {
                createDate: 'DESC',
            }
        })
    }
}
