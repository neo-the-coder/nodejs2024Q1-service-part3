import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.loggingService.log(
        `\nREQUEST - URL: ${req.originalUrl} | PARAMS: ${JSON.stringify(
          req.params,
        )} | BODY: ${JSON.stringify(req.body)}\nRESPONSE - STATUS CODE: ${
          res.statusCode
        }`,
      );
    });
    next();
  }
}
