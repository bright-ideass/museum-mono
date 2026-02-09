import { Controller, Get, Req, } from '@nestjs/common';
import { AppService } from './app.service';
import { HashService } from './common/bcrypt/hash.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly hashService: HashService
  ) { }

  @Get()
  getHello(@Req() req): string {
    console.log(req?.headers);
    return this.appService.getHello();
  }


}
