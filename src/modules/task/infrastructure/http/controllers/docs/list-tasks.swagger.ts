import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ListTasksResponseDto } from '../../dtos/list-tasks.dto';

export function ApiListTasks() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a list of tasks',
      description: 'Get a list of tasks',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Tasks found successfully',
      type: ListTasksResponseDto,
    }),
  );
}
