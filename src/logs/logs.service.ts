import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class LogsService {
  private logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' })
    ]
  });

  private logs: any[] = [];

  log(level: string, message: string, meta: any = {}) {
    const logEntry = {
      timestamp: new Date(),
      level,
      message,
      ...meta
    };
    
    this.logs.push(logEntry);
    this.logger.log(level, message, meta);
    
    // Keep only last 1000 logs in memory
    if (this.logs.length > 1000) {
      this.logs.shift();
    }
  }

  getLogs(limit: number = 100, level?: string) {
    let filteredLogs = this.logs;
    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level);
    }
    return filteredLogs.slice(-limit);
  }

  clearLogs() {
    this.logs = [];
    return { message: 'Logs cleared successfully' };
  }
}