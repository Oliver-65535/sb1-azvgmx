import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LogDto, CreateLogDto } from './dto/log.dto';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get system logs' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of logs to return' })
  @ApiQuery({ name: 'level', required: false, enum: ['info', 'warn', 'error'], description: 'Log level filter' })
  @ApiResponse({ status: 200, description: 'List of logs', type: [LogDto] })
  getLogs(@Query('limit') limit?: number, @Query('level') level?: string) {
    return this.logsService.getLogs(limit, level);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new log entry' })
  @ApiBody({ type: CreateLogDto })
  @ApiResponse({ status: 201, description: 'Log entry created' })
  addLog(@Body() logData: CreateLogDto) {
    return this.logsService.log(logData.level, logData.message, logData.meta);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear all logs' })
  @ApiResponse({ status: 200, description: 'Logs cleared successfully' })
  clearLogs() {
    return this.logsService.clearLogs();
  }
}