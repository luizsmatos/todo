import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskAlreadyExistsException } from '@src/modules/task/domain/exceptions/task-already-exists.exception';

import { CreateTaskResponseDto } from '../../dtos/create-task.dto';

export function ApiCreateTask() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new task',
      description: 'Create a new task',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Task created successfully',
      type: CreateTaskResponseDto,
    }),
    ApiException(() => [new TaskAlreadyExistsException('task 1')]),
  );
}
