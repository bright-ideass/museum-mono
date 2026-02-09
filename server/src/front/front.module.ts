import { Module } from '@nestjs/common';
import { MuseumModule } from './museum/museum.module';
import { WebModule } from './web/web.module';
import { LogModule } from './log/log.module';
import { GameModule } from './game/game.module';
import { CollectionModule } from './collection/collection.module';

@Module({
    imports: [
        MuseumModule, WebModule, LogModule, GameModule, CollectionModule],
})
export class FrontModule { }
