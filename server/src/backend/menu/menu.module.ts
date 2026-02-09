import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MenuController]
})
export class MenuModule { }
