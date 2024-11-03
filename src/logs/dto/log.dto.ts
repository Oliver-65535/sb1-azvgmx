import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty({ example: '2023-08-10T12:00:00.000Z' })
  timestamp: Date;

  @ApiProperty({ enum: ['info', 'warn', 'error'], example: 'info' })
  level: string;

  @ApiProperty({ example: 'System started successfully' })
  message: string;

  @ApiProperty({ required: false, example: { userId: 123 } })
  meta?: any;
}

export class CreateLogDto {
  @ApiProperty({ enum: ['info', 'warn', 'error'], example: 'info' })
  level: string;

  @ApiProperty({ example: 'System started successfully' })
  message: string;

  @ApiProperty({ required: false, example: { userId: 123 } })
  meta?: any;
}