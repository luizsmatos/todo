import { ApiProperty } from '@nestjs/swagger';
import {
  PaginationMixin,
  PaginationQueryDto,
} from '@shared/infrastructure/http/dtos/pagination.dto';
import { TaskStatus } from '@src/modules/task/domain/entities/task.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { BaseTaskResponseDto } from './base-task.dto';

export class ListTasksQueryDto extends PaginationQueryDto {
  @ApiProperty({
    example: 'Task 1',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Task 1 description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'PENDING',
    enum: TaskStatus,
    enumName: 'TaskStatus',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class ListTasksResponseDto extends PaginationMixin(
  BaseTaskResponseDto,
) {}
