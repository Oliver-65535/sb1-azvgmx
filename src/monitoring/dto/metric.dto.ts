import { ApiProperty } from '@nestjs/swagger';

class CpuMetricDto {
  @ApiProperty({ example: 45.2 })
  usage: number;

  @ApiProperty({ example: 8 })
  cores: number;

  @ApiProperty({ example: [1.2, 1.5, 1.7] })
  loadAvg: number[];
}

class MemoryMetricDto {
  @ApiProperty({ example: 16000000000 })
  total: number;

  @ApiProperty({ example: 8000000000 })
  free: number;

  @ApiProperty({ example: 50.5 })
  usage: number;
}

export class MetricDto {
  @ApiProperty()
  timestamp: Date;

  @ApiProperty({ type: CpuMetricDto })
  cpu: CpuMetricDto;

  @ApiProperty({ type: MemoryMetricDto })
  memory: MemoryMetricDto;

  @ApiProperty({ example: 3600 })
  uptime: number;
}