import { Controller, Get, Query } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MetricDto } from './dto/metric.dto';

@ApiTags('monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  @ApiOperation({ summary: 'Get system metrics history' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of metrics to return' })
  @ApiResponse({ status: 200, description: 'List of metrics', type: [MetricDto] })
  getMetrics(@Query('limit') limit?: number) {
    return this.monitoringService.getMetrics(limit);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current system metrics' })
  @ApiResponse({ status: 200, description: 'Current system metrics', type: MetricDto })
  getCurrentMetrics() {
    return this.monitoringService.getCurrentMetrics();
  }
}