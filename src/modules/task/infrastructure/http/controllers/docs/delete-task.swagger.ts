import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

export function ApiDeleteTask() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a task',
      description: 'Delete a task',
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Task deleted successfully',
    }),
    ApiException(() => [ResourceNotFoundException, NotAllowedException]),
  );
}
