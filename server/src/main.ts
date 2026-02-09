import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { join } from 'path';

async function bootstrap() {
  process.env.TZ = 'Asia/Taipei';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe);
  app.useStaticAssets(join(process.env.FILE_UPLOAD_WEB_PATH), { prefix: `/${process.env.FILE_UPLOAD_WEB_PREFIX_PATH}/` });
  app.enableCors();
  // app.setGlobalPrefix('cbc2023/server');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
