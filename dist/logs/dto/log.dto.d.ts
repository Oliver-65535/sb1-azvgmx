export declare class LogDto {
    timestamp: Date;
    level: string;
    message: string;
    meta?: any;
}
export declare class CreateLogDto {
    level: string;
    message: string;
    meta?: any;
}
