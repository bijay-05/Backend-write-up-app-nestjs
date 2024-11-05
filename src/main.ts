import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter, PrismaExceptionFilter } from 'src/common/filters';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["log", "error"]});

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>("PORT")

  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix("/api/v1");

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
