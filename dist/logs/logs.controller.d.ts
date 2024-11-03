import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/log.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    getLogs(limit?: number, level?: string): any[];
    addLog(logData: CreateLogDto): void;
    clearLogs(): {
        message: string;
    };
}
