import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import { UsersModule} from './users/users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
