import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggingService {
    private readonly logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info', // Log all levels
            format: winston.format.json(),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                })
            ]
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    warn(message: string) {
        this.logger.warn(message)
    }

    error(message: string) {
        this.logger.error(message)
    }

    http(message: string) {
        this.logger.http(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    silly(message: string) {
        this.logger.silly(message);
    }

}
