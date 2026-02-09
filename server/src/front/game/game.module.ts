import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { ICM_A_QAGame } from 'src/entities/ICM_A_QAGame';
import { ICM_B_QAGameLeague } from 'src/entities/ICM_B_AQGameLeague';

@Module({
    imports: [TypeOrmModule.forFeature([ICM_A_QAGame, ICM_B_QAGameLeague])],
    controllers: [GameController],
    providers: [GameService],
})

export class GameModule {

}