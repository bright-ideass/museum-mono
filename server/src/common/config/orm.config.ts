import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

import { createDecipheriv, createCipheriv, randomBytes, scrypt } from 'crypto';


export default class TypeOrmConfig {

    static getOrmConfig(configService): TypeOrmModuleOptions {

        const data = configService.get('DB_CONFIG');
        const secretOrKey = configService.get('DB_JWT');

        const jwtPass = jwt.verify(data, Buffer.from(secretOrKey, 'base64')) as TokenInterface;
        
        const decipher = createDecipheriv('aes-256-ctr', Buffer.from(process.env.ASE_KEY, 'base64'), Buffer.from(process.env.ASE_IV, 'base64'));
        const decryptedText = Buffer.concat([
            decipher.update(Buffer.from(jwtPass.password, 'base64')),
            decipher.final(),
        ]);


        return {
            type: 'mssql',
            host: jwtPass.host,
            username: jwtPass.username,
            password: decryptedText.toString(),
            database: jwtPass.database,
            entities: [__dirname + 'dist/entities/*{.ts,.js}'],
            logging: false,
            /*
            extra: {
                trustServerCertificate: true
            },*/
            options: { encrypt: false },
            synchronize: true,
            autoLoadEntities: true,
        };
    }

}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService]
};

export interface TokenInterface {
    host: string;
    username: string;
    password: string;
    database: string;
}
