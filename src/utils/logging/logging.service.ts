// import { Injectable } from '@nestjs/common';

import { ConsoleLogger, Injectable } from '@nestjs/common';
import { mkdir, rename, stat, writeFile } from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggingService {
  private logLevel: number = +process.env.LOG_LEVEL || 5;
  private logFileMaxSize: number = +process.env.LOG_MAX_FILE_SIZE * 1024;
  private logDirectory: string = path.join(process.cwd(), 'logs');
  private logFile: string = path.join(this.logDirectory, 'log.log');
  private errorFile: string = path.join(this.logDirectory, 'error.log');

  constructor() {
    super();
    mkdir(this.logDirectory, (err) => {
      if (err) console.error('Skipping log directory creation...');
    });
    writeFile(this.logFile, '', { flag: 'a' }, (err) => {
      if (err) console.error('Failed to initialize logFile', err);
    });
    writeFile(this.errorFile, '', { flag: 'a' }, (err) => {
      if (err) console.error('Failed to initialize errorFile', err);
    });
  }

  error(message: any) {
    if (this.logLevel >= 0) {
      this.determineLogLevel('error', message);
    }
  }

  warn(message: string) {
    if (this.logLevel >= 1) {
      this.determineLogLevel('warn', message);
    }
  }

  log(message: string) {
    if (this.logLevel >= 2) {
      this.determineLogLevel('log', message);
    }
  }

  debug(message: string) {
    if (this.logLevel >= 3) {
      this.determineLogLevel('debug', message);
    }
  }

  verbose(message: string) {
    if (this.logLevel >= 4) {
      this.determineLogLevel('verbose', message);
    }
  }

  private determineLogLevel(
    level: 'log' | 'error' | 'warn' | 'debug' | 'verbose',
    message: string,
  ) {
    super[level][message];
    const msgToWrite = `${new Date().toUTCString()} | ${level.toUpperCase()} | ${message}\n`;
    this.writeLogToFile(level === 'error', msgToWrite);
  }

  private async writeLogToFile(isError: boolean, message: string) {
    const filePath = isError ? this.errorFile : this.logFile;
    writeFile(filePath, message, { flag: 'a' }, (err) => {
      if (err) console.error('Failed to log', err);
      else {
        process.stdout.write(message);
        this.checkAndRotateLogFile(filePath);
      }
    });
  }

  private checkAndRotateLogFile(filePath: string) {
    stat(filePath, (err, { size }) => {
      if (err) console.error('Error occured while getting file size', err);
      else {
        if (size > this.logFileMaxSize) {
          const timestampFilePath = filePath.replace(
            '.log',
            `-${Date.now()}.log`,
          );
          rename(filePath, timestampFilePath, (err) => {
            if (err)
              console.error('Error occured while renaming log file', err);
          });
        }
      }
    });
  }
}
