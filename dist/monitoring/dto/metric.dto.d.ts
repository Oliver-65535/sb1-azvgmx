declare class CpuMetricDto {
    usage: number;
    cores: number;
    loadAvg: number[];
}
declare class MemoryMetricDto {
    total: number;
    free: number;
    usage: number;
}
export declare class MetricDto {
    timestamp: Date;
    cpu: CpuMetricDto;
    memory: MemoryMetricDto;
    uptime: number;
}
export {};
