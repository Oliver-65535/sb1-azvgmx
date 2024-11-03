"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const os = require("os");
const osUtils = require("os-utils");
const util_1 = require("util");
let MonitoringService = class MonitoringService {
    constructor() {
        this.metrics = [];
        this.getCPUUsage = (0, util_1.promisify)(osUtils.cpuUsage);
    }
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
        if (this.metrics.length > 1000) {
            this.metrics.shift();
        }
    }
    getMetrics(limit = 60) {
        return this.metrics.slice(-limit);
    }
    getCurrentMetrics() {
        return this.metrics[this.metrics.length - 1] || null;
    }
};
exports.MonitoringService = MonitoringService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitoringService.prototype, "collectMetrics", null);
exports.MonitoringService = MonitoringService = __decorate([
    (0, common_1.Injectable)()
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map