import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
