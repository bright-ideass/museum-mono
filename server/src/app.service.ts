import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {

    return '中央銀行 劵幣博物館 API系統!';
  }
}
