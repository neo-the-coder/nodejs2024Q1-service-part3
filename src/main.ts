import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getDB } from './db/DB';
import { LoggingService } from './utils/logging/logging.service';
import { CustomExceptionFilter } from './utils/customExceptionFilter';
export const myDB = getDB();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = app.get(LoggingService);
  // const logger = await app.resolve(LoggingService);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  // Enable Logger
  app.useLogger(logger);
  // Enable Exception filter
  app.useGlobalFilters(new CustomExceptionFilter(httpAdapter, logger));

  await app.listen(PORT);

  logger.log(`Server started on port ${PORT}`);

  // Event listeners
  process.on('uncaughtException', (error) => {
    logger.logError(error);
    // process.exit(1);
    throw error;
  });

  process.on('unhandledRejection', (reason) => {
    logger.logError(reason);
    // process.exit(1);
  });
}
bootstrap();
