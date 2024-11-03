export declare class MonitoringService {
    private metrics;
    private getCPUUsage;
    collectMetrics(): Promise<void>;
    getMetrics(limit?: number): any[];
    getCurrentMetrics(): any;
}
