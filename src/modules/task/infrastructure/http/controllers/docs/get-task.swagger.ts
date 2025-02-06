import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotAllowedException } from '@src/shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@src/shared/domain/exceptions/resource-not-found.exception';

import { GetTaskResponseDto } from '../../dtos/get-task.dto';

export function ApiGetTask() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a task',
      description: 'Get a task',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Task found successfully',
      type: GetTaskResponseDto,
    }),
    ApiException(() => [ResourceNotFoundException, NotAllowedException]),
  );
}
