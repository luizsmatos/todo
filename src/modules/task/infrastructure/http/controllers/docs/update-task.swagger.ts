import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';
import { TaskAlreadyExistsException } from '@src/modules/task/domain/exceptions/task-already-exists.exception';

import { UpdateTaskResponseDto } from '../../dtos/update-task.dto';

export function ApiUpdateTask() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a new task',
      description: 'Update a new task',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Task updated successfully',
      type: UpdateTaskResponseDto,
    }),
    ApiException(() => [
      new TaskAlreadyExistsException('example task'),
      ResourceNotFoundException,
      NotAllowedException,
    ]),
  );
}
