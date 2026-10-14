import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/goodbye')
  getGoodbye(): string {
    return this.appService.getGoodbye();
  }

  @Get ('/hello/:name')
 async gethello(@Param('name') name: string): Promise<string> {
    return this.appService.gethello(name);
  }
}
