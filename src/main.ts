import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getDB } from './db/DB';
export const myDB = getDB();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true, // Automatically transform payload data to match the DTO types
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
