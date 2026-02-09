import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { CollectionColtroller } from './collection.controller';
import { CollectionService } from './collection.service';
import { ICM_A_SubCode } from 'src/entities/ICM_A_SubCode';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';

@Module({
    imports: [TypeOrmModule.forFeature([ICM_A_Exhibits, ICM_A_SubCode, ICM_A_ExhibitsImgList])],
    controllers: [CollectionColtroller],
    providers: [CollectionService],
})
export class CollectionModule { }
