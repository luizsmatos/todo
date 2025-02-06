import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  RegisterUserUseCase,
  RegisterUserUseCaseInput,
} from '@src/modules/user/application/use-cases/register-user.use-case';

import { RegisterUserDto } from '../dtos/register-user.dto';
import { ApiRegisterUser } from './docs/register-user.swagger';

@ApiTags('Users')
@Controller()
export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiRegisterUser()
  async handle(@Body() body: RegisterUserDto) {
    const { name, email, password } = body;

    const registerUser: RegisterUserUseCaseInput = {
      name,
      email,
      password,
    };

    await this.registerUserUseCase.execute(registerUser);
  }
}
