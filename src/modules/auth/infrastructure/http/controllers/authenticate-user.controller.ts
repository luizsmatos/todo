import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/infrastructure/http/decorators/public.decorator';
import { AuthenticateUserUseCase } from '@src/modules/auth/application/use-cases/authenticate-user.use-case';

import {
  AuthenticateUserRequestDto,
  AuthenticateUserResponseDto,
} from '../dtos/authenticate-user.dto';
import { ApiAuthenticateUser } from './docs/authenticate-user.swagger';

@ApiTags('Users')
@Controller()
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @ApiAuthenticateUser()
  async handle(
    @Body() body: AuthenticateUserRequestDto,
  ): Promise<AuthenticateUserResponseDto> {
    const { email, password } = body;

    const { accessToken } = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    return { accessToken };
  }
}
