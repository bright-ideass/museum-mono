import { Module } from '@nestjs/common';
import { CbcLogService } from './cbc-log.service';
import { CbcLogController } from './cbc-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cbcLog } from 'src/entities/cbclog.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([cbcLog]), HttpModule],
  providers: [CbcLogService],
  controllers: [CbcLogController]
})
export class CbcLogModule { }
