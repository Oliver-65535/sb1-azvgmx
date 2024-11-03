"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
let LogsService = class LogsService {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston_1.transports.File({ filename: 'logs/combined.log' })
            ]
        });
        this.logs = [];
    }
    log(level, message, meta = {}) {
        const logEntry = {
            timestamp: new Date(),
            level,
            message,
            ...meta
        };
        this.logs.push(logEntry);
        this.logger.log(level, message, meta);
        if (this.logs.length > 1000) {
            this.logs.shift();
        }
    }
    getLogs(limit = 100, level) {
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
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)()
], LogsService);
//# sourceMappingURL=logs.service.js.map