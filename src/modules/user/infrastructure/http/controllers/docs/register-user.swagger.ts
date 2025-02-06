import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAlreadyExistsException } from '@src/modules/user/domain/exceptions/user-already-exists.exception';

export function ApiRegisterUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register User',
      description: 'Register a new user',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User registered successfully',
    }),
    ApiException(() => [new UserAlreadyExistsException('johndoe@example.com')]),
  );
}
