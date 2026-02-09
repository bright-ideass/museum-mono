import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UnsubscribeOnCloseInterceptor } from './common/interceptor/unsubscribe-on-close.interceptor';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './common/config/orm.config';
import { HashService } from './common/bcrypt/hash.service';
import { BackendModule } from './backend/backend.module';
import { FrontModule } from './front/front.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['__dirname', './enviroments/.development.env'] }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BackendModule,
    FrontModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }, /*{
      provide: APP_INTERCEPTOR,
      useClass: UnsubscribeOnCloseInterceptor
    }*/],
})
export class AppModule { }
