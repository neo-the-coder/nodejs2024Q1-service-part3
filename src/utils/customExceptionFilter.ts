// import {
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';
// import { LoggingService } from './logging.service';

import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { HttpAdapterHost } from '@nestjs/core';

// @Catch()
// export class CustomExceptionFilter extends BaseExceptionFilter {
//   constructor(private readonly logger: LoggingService) {
//     super();
//   }

//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     if (exception instanceof HttpException) {
//       // Log HTTP exception
//       this.logger.logError(exception);
//       super.catch(exception, host);
//     } else {
//       // Log unexpected errors
//       this.logger.logError(exception);
//       response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Internal Server Error',
//       });
//     }
//   }
// }

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly httpAdapter: HttpAdapterHost,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapter;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // Log error
    this.loggingService.logError(exception);

    const resBody = {
      path: httpAdapter.getRequestUrl(request),
      statusCode,
      message: 'Internal Server Error',
    };

    // send response
    httpAdapter.reply(response, resBody, statusCode);

    // response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //   statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //   message: 'Internal Server Error',
    // });
  }
}
