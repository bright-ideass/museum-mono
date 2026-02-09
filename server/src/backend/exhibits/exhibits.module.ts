import { Module } from '@nestjs/common';
import { ExhibitController } from './exhibit/exhibit.controller';
import { ExhibitService } from './exhibit/exhibit.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ICM_A_Exhibits } from 'src/entities/ICM_A_Exhibits';
import { ICM_A_ExhibitsE } from 'src/entities/ICM_A_ExhibitsE';
import { ICM_A_Code } from 'src/entities/ICM_A_Code';
import { ICM_A_SubCode } from 'src/entities/ICM_A_SubCode';
import { ICM_A_Navigation } from 'src/entities/ICM_A_Navigation';
import { ICM_A_NavigationExhibits } from 'src/entities/ICM_A_NavigationExhibits';
import { NavigationController } from './navigation/navigation.controller';
import { NavigationService } from './navigation/navigation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ICM_A_Exhibits, ICM_A_ExhibitsE, ICM_A_Code, ICM_A_SubCode, ICM_A_Navigation, ICM_A_NavigationExhibits])],
  controllers: [ExhibitController, NavigationController],
  providers: [ExhibitService, NavigationService]
})
export class ExhibitsModule { }
