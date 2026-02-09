import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { ICM_A_ExhibitsImgList } from 'src/entities/ICM_A_ExhibitsImgList';

@Module({
  imports: [TypeOrmModule.forFeature([ICM_A_ExhibitsImgList])],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule {}
