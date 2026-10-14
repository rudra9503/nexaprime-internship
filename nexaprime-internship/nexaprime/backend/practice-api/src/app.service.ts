import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGoodbye(): string {
    return 'Goodbye World!';
  }

  async gethello(name: string): Promise<string> {
    setTimeout(() => {
      console.log(`Hello ${name}!`);
    }, 1000);
    return `Hello ${name}!`;
  }
}

