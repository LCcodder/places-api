import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  configuration().log()
  const app = await NestFactory.create(AppModule);
  await app.listen(configuration().port);
}
bootstrap();
