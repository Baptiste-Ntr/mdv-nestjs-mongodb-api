import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
    constructor(private readonly loggingService: LoggingService) { }

    use(req: any, res: any, next: () => void) {
        morgan('combined', {
            stream: {
                write: (message: string) => this.loggingService.info(message),
            },
        })(req, res, next);
    }
}