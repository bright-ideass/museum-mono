
import * as bcrypt from 'bcrypt';

export class HashService {
    private SaltRounds = 10;
    private iv = Buffer.from(process.env.ASE_IV, 'base64');
    private key = Buffer.from(process.env.ASE_KEY, 'base64');

    // 加密
    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.SaltRounds);
    }

    // 驗證密碼
    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}