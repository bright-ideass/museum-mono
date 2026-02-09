import * as passport from 'passport';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { backendStrategy, backendSession } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [PassportModule.register({ Strategy: 'backend' }),
        HttpModule],
    providers: [AuthService, backendStrategy, backendSession],
    controllers: [AuthController],
})

export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(passport.authenticate('backend', { session: false }))
            .forRoutes(
                { path: 'backend/**', method: RequestMethod.ALL },
            );
    }
}
