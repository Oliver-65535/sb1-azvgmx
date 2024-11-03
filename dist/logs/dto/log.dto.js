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
exports.CreateLogDto = exports.LogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LogDto {
}
exports.LogDto = LogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-08-10T12:00:00.000Z' }),
    __metadata("design:type", Date)
], LogDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['info', 'warn', 'error'], example: 'info' }),
    __metadata("design:type", String)
], LogDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'System started successfully' }),
    __metadata("design:type", String)
], LogDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: { userId: 123 } }),
    __metadata("design:type", Object)
], LogDto.prototype, "meta", void 0);
class CreateLogDto {
}
exports.CreateLogDto = CreateLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['info', 'warn', 'error'], example: 'info' }),
    __metadata("design:type", String)
], CreateLogDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'System started successfully' }),
    __metadata("design:type", String)
], CreateLogDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: { userId: 123 } }),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "meta", void 0);
//# sourceMappingURL=log.dto.js.map