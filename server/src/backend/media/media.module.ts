import { Module } from '@nestjs/common';
import { DataDownloadService } from './data-download/data-download.service';
import { DataDownloadController } from './data-download/data-download.controller';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICM_A_DataDownload } from 'src/entities/ICM_A_DataDownload';
import { ICM_A_QAGame } from 'src/entities/ICM_A_QAGame';
import { ICM_A_QAGameItem } from 'src/entities/ICM_A_QAGameItem';

@Module({
  imports: [TypeOrmModule.forFeature([ICM_A_DataDownload, ICM_A_QAGame, ICM_A_QAGameItem])],
  providers: [DataDownloadService, GameService],
  controllers: [DataDownloadController, GameController]
})
export class MediaModule { }
