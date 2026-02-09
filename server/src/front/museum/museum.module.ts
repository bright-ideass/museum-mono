import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICM_A_NavigationExhibits } from 'src/entities/ICM_A_NavigationExhibits';
import { MuseumService } from './museum.service';
import { MuseumController } from './museum.controller';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { ICM_A_SubCode } from 'src/entities/ICM_A_SubCode';
import { ICM_A_Navigation } from 'src/entities/ICM_A_Navigation';

@Module({
    imports: [TypeOrmModule.forFeature([ICM_A_Navigation, ICM_A_NavigationExhibits, ICM_A_Exhibits, ICM_A_SubCode])],
    controllers: [MuseumController],
    providers: [MuseumService],
})
export class MuseumModule { }
