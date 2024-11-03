export declare class LogsService {
    private logger;
    private logs;
    log(level: string, message: string, meta?: any): void;
    getLogs(limit?: number, level?: string): any[];
    clearLogs(): {
        message: string;
    };
}
