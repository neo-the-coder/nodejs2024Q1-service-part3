// import { Injectable } from '@nestjs/common';

import { ConsoleLogger, Injectable } from '@nestjs/common';
import path from 'path';

// @Injectable()
// export class LoggingService {
//   logIncomingRequest(request) {
//     // Log incoming request details
//     console.log('Incoming request:', request.url, request.query, request.body);
//   }

//   logOutgoingResponse(response) {
//     // Log outgoing response details
//     console.log('Outgoing response:', response.statusCode);
//   }

//   logError(error) {
//     // Log error details
//     console.error('Error occurred:', error);
//   }
// }

// 68468468468468468464646846846846846488646

// import { Injectable, Logger } from '@nestjs/common';

// @Injectable()
// export class LoggingService {
//   private logger: Logger;

//   constructor() {
//     this.logger = new Logger();
//   }

//   logRequest(req): void {
//     const logMessage = `Incoming request 
//     - Method: ${req.method};
//     - URL: ${req.url};
//     - Query: ${JSON.stringify(req.query)};
//     - Body: ${JSON.stringify(req.body)}`;
//     this.logger.log(logMessage);
//   }

//   logResponse(res): void {
//     const logMessage = `Outgoing response - Status: ${res.statusCode}`;
//     this.logger.log(logMessage);
//   }

//   logError(error): void {
//     const logMessage = `Error occurred - ${error.stack}`;
//     this.logger.error(logMessage);
//   }
// }

@Injectable
export class LoggingService extends ConsoleLogger implements LoggingService {
  private logLevel: number = +process.env.LOG_LEVEL;
  private logSize: number;
  private logFile: string;
  private errorFile: string;
  constructor() {
    super();
    this.logFile = path.join(process.cwd(), 'logs', 'log.log');
    this.errorFile = path.join(process.cwd(), 'logs', 'error.log');
  }
}