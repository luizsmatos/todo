import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { GetProfileResponseDto } from '../../dtos/get-profile.dto';

export function ApiGetProfile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Profile',
      description: 'Get the user profile',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User profile',
      type: GetProfileResponseDto,
    }),
    ApiException(() => [ResourceNotFoundException]),
  );
}
