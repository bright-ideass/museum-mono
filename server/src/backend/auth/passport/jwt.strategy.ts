import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { PassportSerializer } from '@nestjs/passport';
@Injectable()
export class backendStrategy extends PassportStrategy(Strategy, 'backend') {
    constructor(private readonly authService: AuthService,
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: process.env.JWT_SECRET
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
    }

    public async verify(req, payload, done) {
        // console.log('payload', payload)
   
        if (!payload.AuthSessionToken) {
            return done('Unauthorized!!!', false);
        }
        done(null, payload);
    }
}

@Injectable()
export class backendSession extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void,): void {
        //  console.log('serializeUser:', user)       
        done(null, user);
    }
    deserializeUser(payload: string,
        done: (err: Error, payload: string) => void
    ): void {
        // console.log('deserializeUser:', payload)
        done(null, null);
    }
}
