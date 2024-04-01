import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapter: HttpAdapterHost,
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapter;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Log error
    this.loggingService.error(exception);

    const resBody = {
      path: httpAdapter.getRequestUrl(request),
      statusCode,
      message: 'Internal Server Error',
    };

    // send response
    httpAdapter.reply(response, resBody, statusCode);
  }
}
