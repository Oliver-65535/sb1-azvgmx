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
exports.MetricDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CpuMetricDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.2 }),
    __metadata("design:type", Number)
], CpuMetricDto.prototype, "usage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], CpuMetricDto.prototype, "cores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1.2, 1.5, 1.7] }),
    __metadata("design:type", Array)
], CpuMetricDto.prototype, "loadAvg", void 0);
class MemoryMetricDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16000000000 }),
    __metadata("design:type", Number)
], MemoryMetricDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8000000000 }),
    __metadata("design:type", Number)
], MemoryMetricDto.prototype, "free", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50.5 }),
    __metadata("design:type", Number)
], MemoryMetricDto.prototype, "usage", void 0);
class MetricDto {
}
exports.MetricDto = MetricDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MetricDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CpuMetricDto }),
    __metadata("design:type", CpuMetricDto)
], MetricDto.prototype, "cpu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MemoryMetricDto }),
    __metadata("design:type", MemoryMetricDto)
], MetricDto.prototype, "memory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600 }),
    __metadata("design:type", Number)
], MetricDto.prototype, "uptime", void 0);
//# sourceMappingURL=metric.dto.js.map