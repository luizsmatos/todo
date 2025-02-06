import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WrongCredentialsException } from '@src/modules/auth/domain/exceptions/wrong-credentials.exception';

import { AuthenticateUserResponseDto } from '../../dtos/authenticate-user.dto';

export function ApiAuthenticateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Authenticate user',
      description: 'Authenticate a user',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User authenticated successfully',
      type: AuthenticateUserResponseDto,
    }),
    ApiException(() => [WrongCredentialsException]),
  );
}
