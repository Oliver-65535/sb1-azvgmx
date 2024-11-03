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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsController = void 0;
const common_1 = require("@nestjs/common");
const logs_service_1 = require("./logs.service");
const swagger_1 = require("@nestjs/swagger");
const log_dto_1 = require("./dto/log.dto");
let LogsController = class LogsController {
    constructor(logsService) {
        this.logsService = logsService;
    }
    getLogs(limit, level) {
        return this.logsService.getLogs(limit, level);
    }
    addLog(logData) {
        return this.logsService.log(logData.level, logData.message, logData.meta);
    }
    clearLogs() {
        return this.logsService.clearLogs();
    }
};
exports.LogsController = LogsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get system logs' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of logs to return' }),
    (0, swagger_1.ApiQuery)({ name: 'level', required: false, enum: ['info', 'warn', 'error'], description: 'Log level filter' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of logs', type: [log_dto_1.LogDto] }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new log entry' }),
    (0, swagger_1.ApiBody)({ type: log_dto_1.CreateLogDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Log entry created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_dto_1.CreateLogDto]),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "addLog", null);
__decorate([
    (0, common_1.Post)('clear'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear all logs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logs cleared successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "clearLogs", null);
exports.LogsController = LogsController = __decorate([
    (0, swagger_1.ApiTags)('logs'),
    (0, common_1.Controller)('logs'),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], LogsController);
//# sourceMappingURL=logs.controller.js.map