import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import configuration from './api/shared/config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  configuration().log()
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  
  app.setGlobalPrefix("/api/v1")
  await app.listen(configuration().port);
}
bootstrap();
