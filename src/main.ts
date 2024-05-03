import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')

  // This ensure that the validation pipe is globally configured in our applixation this is responsible for automatically validating incomming payloads against the DTOs.if it is not configured or if it;s overridden with custom behaviour validation errors might not be handled as expected.
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
