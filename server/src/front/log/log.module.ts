import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICM_B_ExhibitsVisit } from 'src/entities/ICM_B_ExhibitsVisit';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { ICM_B_Stastics } from 'src/entities/ICM_B_Stastics';

@Module({
    imports: [        
        TypeOrmModule.forFeature([ICM_B_ExhibitsVisit, ICM_B_Stastics])
    ],
    controllers: [LogController],
    providers: [LogService],
})

export class LogModule { }
