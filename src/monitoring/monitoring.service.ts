import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as os from 'os';
import * as osUtils from 'os-utils';
import { promisify } from 'util';

@Injectable()
export class MonitoringService {
  private metrics: any[] = [];
  private getCPUUsage = promisify(osUtils.cpuUsage);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async collectMetrics() {
    const cpuUsage = await this.getCPUUsage();
    const metric = {
      timestamp: new Date(),
      cpu: {
        usage: 100,
        cores: os.cpus().length,
        loadAvg: os.loadavg(),
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        usage: (1 - os.freemem() / os.totalmem()) * 100,
      },
      uptime: os.uptime(),
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }
  }

  getMetrics(limit: number = 60) {
    return this.metrics.slice(-limit);
  }

  getCurrentMetrics() {
    return this.metrics[this.metrics.length - 1] || null;
  }
}